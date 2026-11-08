const CACHE = 'mindbloom-v1';
const ASSETS = [
  '/', '/index.html', '/breathing.html', '/chat.html', '/music.html',
  '/reflection.html', '/stats.html', '/user_achievement.html',
  '/css/breathing_style.css', '/css/chat.css', '/css/music.css',
  '/css/reflection.css', '/css/stat.css', '/css/style.css',
  '/css/user_achievements.css',
  '/favicon.svg', '/flower_icon.png', '/squirrel.png',
  '/icons/icon-192.png', '/icons/icon-512.png',
  '/js/chat.js', '/js/music.js', '/js/breathing.js',
  '/js/voice.js', '/js/user_achievment.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.allSettled(ASSETS.map((a) => c.add(a)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // Never cache API calls (chat, saves, etc.), only handle same-origin GETs
  if (req.method !== 'GET' || url.origin !== location.origin || url.pathname.startsWith('/api')) return;

  // Pages: network first, fall back to cache when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/index.html')))
    );
    return;
  }

  // Static assets: cache first
  e.respondWith(caches.match(req).then((r) => r || fetch(req)));
});