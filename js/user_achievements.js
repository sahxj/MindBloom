
// ---------- Achievements and water ----------

const STORAGE_KEY = "mindbloom-progress";
const STAGES = ["Sprout", "Seedling", "Sapling", "Grown"];

// How much water each kind of action gives
const ACTION_WATER = {
    breaths: 1,
    journals: 1,
    moods: 1,
    music: 0
};

// ACHIEVEMENTS
const achievements = [
    {
        id: "first-sprout",
        title: "First Sprout",
        desc: "Complete your first self-care activity",
        reward: 1,
        icon: `<svg viewBox="0 0 24 24">
            <path d="M12 21v-9"></path>
            <path d="M12 14C5 14 4 8 4 5c5 0 9 2 9 7"></path>
            <path d="M12 11c0-5 4-8 9-8 0 5-3 9-9 9"></path>
        </svg>`,
        check: (s) => s.breaths + s.journals >= 1
    },
    {
        id: "deep-breather",
        title: "Deep Breather",
        desc: "Finish 3 breathing sessions",
        reward: 1,
        icon: `<svg viewBox="0 0 24 24">
            <path d="M3 8h8c3 0 3-4 0-4"></path>
            <path d="M2 12h13c4 0 4 5 0 5"></path>
            <path d="M4 16h5"></path>
        </svg>`,
        check: (s) => s.breaths >= 3
    },
    {
        id: "dear-diary",
        title: "Dear Diary",
        desc: "Write your first journal entry",
        reward: 1,
        icon: `<svg viewBox="0 0 24 24">
            <path d="M5 3h14a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2V3Z"></path>
            <path d="M5 17h16"></path>
            <path d="M9 8h7M9 12h5"></path>
        </svg>`,
        check: (s) => s.journals >= 1
    },
    {
        id: "check-in",
        title: "Check-In Champ",
        desc: "Log your mood 3 times",
        reward: 2,
        icon: `<svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <path d="M9 9h.01M15 9h.01"></path>
        </svg>`,
        check: (s) => s.moods >= 3
    },
    {
        id: "settle-in",
        title: "Settle In",
        desc: "Pick a focus sound",
        reward: 1,
        icon: `<svg viewBox="0 0 24 24">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
        </svg>`,
        check: (s) => s.music >= 1
    }
];


// LOAD SAVED PROGRESS
function loadProgress() {
    const progress = {
        stats: {
            breaths: 0,
            journals: 0,
            moods: 0,
            music: 0
        },
        unlocked: [],
        buckets: 0
    };

    try {
        const saved = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        if (saved) {
            Object.assign(progress.stats, saved.stats || {});
            progress.unlocked = saved.unlocked || [];
            progress.buckets = saved.buckets || 0;
        }
    } catch (e) {
        console.log("Could not load progress");
    }

    return progress;
}


// SAVE PROGRESS
function saveProgress(progress) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(progress)
        );
    } catch (e) {
        console.log("Could not save progress");
    }
}


// CHECK FOR NEW ACHIEVEMENTS
function checkAchievements(stats, unlocked) {
    return achievements.filter(
        (a) => !unlocked.includes(a.id) && a.check(stats)
    );
}


// RECORD AN ACTIVITY
function recordAction(type) {
    const progress = loadProgress();

    if (!(type in progress.stats)) {
        console.error("Unknown activity:", type);
        return;
    }

    progress.stats[type] += 1;
    progress.buckets += ACTION_WATER[type];

    const newOnes = checkAchievements(
        progress.stats,
        progress.unlocked
    );

    newOnes.forEach(function (a, index) {
        progress.unlocked.push(a.id);
        progress.buckets += a.reward;

        setTimeout(function () {
            showToast(
                "🌱 " + a.title + " unlocked! +" + a.reward + " 💧"
            );
        }, index * 1800);
    });

    saveProgress(progress);
    renderAchievements();
    updateWater();
}


// ACHIEVEMENT POP-UP
function showToast(text) {
    const toast = document.createElement("div");

    toast.className = "achievement-toast";
    toast.textContent = text;

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 3500);
}


// DISPLAY ACHIEVEMENTS
function renderAchievements() {
    const list = document.getElementById("achievements-list");

    if (!list) return;

    const progress = loadProgress();

    list.innerHTML = "";

    achievements.forEach(function (a) {
        const isUnlocked = progress.unlocked.includes(a.id);

        const item = document.createElement("div");

        item.className = isUnlocked
            ? "achievement"
            : "achievement locked";

        item.innerHTML = `
            <span class="achievement-icon ${a.id}">
                ${a.icon}
            </span>

            <div>
                <strong>${a.title}</strong>
                <small>
                    ${a.desc} · +${a.reward} 💧
                </small>
            </div>
        `;

        list.appendChild(item);
    });
}


// UPDATE WATER COUNT AND TREE STAGE
function updateWater() {
    const label = document.getElementById("water-count");

    if (!label) return;

    const progress = loadProgress();

    const stageNumber = Math.min(
        Math.floor(progress.buckets / 3),
        STAGES.length - 1
    );

    label.textContent =
        "💧 " + progress.buckets +
        " buckets · Tree stage: " +
        STAGES[stageNumber];
}


// INITIALIZE
document.addEventListener("DOMContentLoaded", function () {
    renderAchievements();
    updateWater();
});
