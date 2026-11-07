// Fill each playlist with a Spotify share link:
// Spotify -> open a playlist -> ··· -> Share -> Copy link to playlist
const categories = {
  "deep-focus":    { title: "Deep Focus",      playlist: "", search: "deep focus" },
  "rain-sounds":   { title: "Rain Sounds",     playlist: "", search: "rain sounds" },
  "ocean-waves":   { title: "Ocean Waves",     playlist: "", search: "ocean waves" },
  "classical":     { title: "Classical Music", playlist: "", search: "classical music" },
  "lofi":          { title: "Lofi Beats",      playlist: "", search: "lofi beats" },
  "find-your-own": { title: "Find your own",   playlist: "", search: "" },
};

const buttons = document.querySelectorAll(".category");
const nowTitle = document.getElementById("now-title");
const openLink = document.getElementById("open-spotify");
const frame = document.getElementById("spotify-frame");
const noPlaylist = document.getElementById("no-playlist");
const findOwn = document.getElementById("find-own");
const ownInput = document.getElementById("own-input");
const ownButton = document.getElementById("own-button");
const ownError = document.getElementById("own-error");

// Turn a normal Spotify link into an embed link
function toEmbedUrl(link) {
  const match = link.match(
    /open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:user\/[^/]+\/)?(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/
  );
  if (!match) {
    return "";
  }
  return "https://open.spotify.com/embed/" + match[1] + "/" + match[2];
}

function showPlayer(embedUrl, message) {
  if (embedUrl !== "") {
    frame.src = embedUrl;
    frame.classList.remove("hidden");
    noPlaylist.classList.add("hidden");
  } else {
    frame.removeAttribute("src");
    frame.classList.add("hidden");
    noPlaylist.textContent = message;
    noPlaylist.classList.remove("hidden");
  }
}

function showCategory(key) {
  const cat = categories[key];

  // highlight the chosen button
  buttons.forEach(function (btn) {
    if (btn.dataset.key === key) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });

  nowTitle.textContent = cat.title;
  ownError.textContent = "";

  if (key === "find-your-own") {
    findOwn.classList.remove("hidden");
    openLink.href = "https://open.spotify.com/search";
    const saved = localStorage.getItem("mindbloom-own-link");
    if (saved) {
      ownInput.value = saved;
      showPlayer(toEmbedUrl(saved), "");
      openLink.href = saved;
    } else {
      showPlayer("", "Paste a Spotify link above to load it here.");
    }
    return;
  }

  findOwn.classList.add("hidden");

  if (cat.playlist !== "") {
    showPlayer(toEmbedUrl(cat.playlist), "");
    openLink.href = cat.playlist;
  } else {
    showPlayer("", "No playlist added for this category yet. Use Open in Spotify to browse.");
    openLink.href = "https://open.spotify.com/search/" + encodeURIComponent(cat.search);
  }
}

// Category buttons
buttons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    showCategory(btn.dataset.key);
  });
});

// "Find your own" load button
ownButton.addEventListener("click", function () {
  const link = ownInput.value.trim();
  const embed = toEmbedUrl(link);
  if (embed === "") {
    ownError.textContent = "That doesn't look like a Spotify link. Copy it from Spotify's Share menu.";
    return;
  }
  ownError.textContent = "";
  localStorage.setItem("mindbloom-own-link", link);
  showPlayer(embed, "");
  openLink.href = link;
});

// Start on Deep Focus
showCategory("deep-focus");