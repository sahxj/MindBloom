if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}

if (window.matchMedia('(display-mode: standalone)').matches &&
    !sessionStorage.getItem('sized')) {
  const W = 430, H = 860;  // desired inner (content) size
  window.resizeTo(
    W + (window.outerWidth - window.innerWidth),
    H + (window.outerHeight - window.innerHeight)
  );
  sessionStorage.setItem('sized', '1'); // only once, so it doesn't fight the user's resizing
}