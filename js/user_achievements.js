// ---------- Achievements and water ----------
const STORAGE_KEY = "mindbloom-progress";
const STAGES = ["Sprout", "Seedling", "Sapling", "Grown"];

// How much water each kind of action gives
const ACTION_WATER = { breaths: 1, journals: 1, moods: 1, music: 0 };

const achievements = [
  { id: "first-sprout",  title: "First Sprout",   desc: "Complete your first self-care activity", reward: 1, check: (s) => s.breaths + s.journals >= 1 },
  { id: "deep-breather", title: "Deep Breather",  desc: "Finish 3 breathing sessions",            reward: 1, check: (s) => s.breaths >= 3 },
  { id: "dear-diary",    title: "Dear Diary",     desc: "Write your first journal entry",         reward: 1, check: (s) => s.journals >= 1 },
  { id: "check-in",      title: "Check-In Champ", desc: "Log your mood 3 times",                  reward: 2, check: (s) => s.moods >= 3 },
  { id: "settle-in",     title: "Settle In",      desc: "Pick a focus sound",                     reward: 1, check: (s) => s.music >= 1 },
];

function loadProgress() {
  const progress = {
    stats: { breaths: 0, journals: 0, moods: 0, music: 0 },
    unlocked: [],
    buckets: 0,
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      Object.assign(progress.stats, saved.stats);
      progress.unlocked = saved.unlocked || [];
      progress.buckets = saved.buckets || 0;
    }
  } catch (e) {
    // nothing saved yet, start fresh
  }
  return progress;
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.log("Could not save progress");
  }
}

function checkAchievements(stats, unlocked) {
  return achievements.filter((a) => !unlocked.includes(a.id) && a.check(stats));
}

// Call this whenever the user does something: recordAction("breaths")
function recordAction(type) {
  const progress = loadProgress();

  progress.stats[type] = progress.stats[type] + 1;
  progress.buckets = progress.buckets + ACTION_WATER[type];

  const newOnes = checkAchievements(progress.stats, progress.unlocked);
  newOnes.forEach(function (a, index) {
    progress.unlocked.push(a.id);
    progress.buckets = progress.buckets + a.reward;
    // show the pop-ups one after another
    setTimeout(function () {
      showToast("🏅 " + a.title + " unlocked! +" + a.reward + " 💧");
    }, index * 1800);
  });

  saveProgress(progress);
  renderAchievements();
  updateWater();
}

function showToast(text) {
  const toast = document.createElement("div");
  toast.className = "achievement-toast";
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.remove();
  }, 3500);
}

// Draw the achievements list (only on pages that have it)
function renderAchievements() {
  const list = document.getElementById("achievements-list");
  if (!list) {
    return;
  }
  const progress = loadProgress();
  list.innerHTML = "";

  achievements.forEach(function (a) {
    const isUnlocked = progress.unlocked.includes(a.id);
    const item = document.createElement("div");
    item.className = isUnlocked ? "achievement" : "achievement locked";
    item.innerHTML =
      '<span class="achievement-icon">' + (isUnlocked ? "🏅" : "🔒") + "</span>" +
      "<div><strong>" + a.title + "</strong><small>" + a.desc + " · +" + a.reward + " 💧</small></div>";
    list.appendChild(item);
  });
}

// Show water count and tree stage (3 buckets per stage)
function updateWater() {
  const label = document.getElementById("water-count");
  if (!label) {
    return;
  }
  const progress = loadProgress();
  const stageNumber = Math.min(Math.floor(progress.buckets / 3), STAGES.length - 1);
  label.textContent = "💧 " + progress.buckets + " buckets · Tree stage: " + STAGES[stageNumber];
}

document.addEventListener("DOMContentLoaded", function () {
  renderAchievements();
  updateWater();
});