
// KEYS & STATE CONFIG
const STORAGE_KEY = 'mindbloom_buckets_logged';

// GET TOTAL LOGGED BUCKETS
function getLoggedBuckets() {
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
}

// GET TREE STAGE
function getStageFromBuckets(buckets) {
    if (buckets >= 9) return 4;
    if (buckets >= 6) return 3;
    if (buckets >= 3) return 2;
    return 1;
}

// WATER ANIMATION
function playWaterAnimation() {
    const animation = document.getElementById('watering-animation');

    if (!animation) return;

    // Reset animation
    animation.classList.remove('active');
    void animation.offsetWidth;

    // Start pouring
    animation.classList.add('active');

    // Hide animation after it finishes
    setTimeout(() => {
        animation.classList.remove('active');
    }, 2600);
}

// UPDATE TREE AND PROGRESS
function updateGardenUI() {
    const buckets = getLoggedBuckets();
    const currentStage = getStageFromBuckets(buckets);

    // Update active tree stage
    document.querySelectorAll('.tree-stage').forEach(el => {
        el.classList.remove('active');
    });

    const activeStageGroup = document.getElementById(
        `tree-stage-${currentStage}`
    );

    if (activeStageGroup) {
        activeStageGroup.classList.add('active');
    }

    // Update progress text
    const progressTextEl = document.querySelector('.progress-bar p');

    if (progressTextEl) {
        const bucketsInCurrentStage =
            currentStage === 4 ? 3 : buckets % 3;

        progressTextEl.textContent =
            `Tree growth: ${bucketsInCurrentStage} / 3 buckets completed (Stage ${currentStage} of 4)`;
    }
}

// COMPLETE ACTIVITY
function completeActivity() {
    const buckets = getLoggedBuckets();
    const oldStage = getStageFromBuckets(buckets);

    // Add one bucket
    const newBuckets = buckets + 1;
    localStorage.setItem(STORAGE_KEY, newBuckets);

    const newStage = getStageFromBuckets(newBuckets);

    // Play watering animation
    playWaterAnimation();

    // Update tree and progress
    updateGardenUI();

    // Stage-up celebration
    if (newStage > oldStage) {
        console.log(`Your tree grew to Stage ${newStage}!`);
    }
}

// INITIALIZE GARDEN
document.addEventListener('DOMContentLoaded', () => {
    updateGardenUI();
});
