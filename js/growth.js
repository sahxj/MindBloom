// Keys & State Config
const STORAGE_KEY = 'mindbloom_buckets_logged';

// Bucket Milestones: 
// 0–2 buckets = Stage 1 (Sprout)
// 3–5 buckets = Stage 2 (Sapling)
// 6–8 buckets = Stage 3 (Small Tree)
// 9+ buckets = Stage 4 (Full Bloom)
function getStageFromBuckets(buckets) {
  if (buckets >= 9) return 4;
  if (buckets >= 6) return 3;
  if (buckets >= 3) return 2;
  return 1;
}

// Get total logged buckets
function getLoggedBuckets() {
  return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
}

// Update UI (Tree Stage + Progress Text)
function updateGardenUI() {
  const buckets = getLoggedBuckets();
  const currentStage = getStageFromBuckets(buckets);

  // 1. Update SVG Active Stage
  document.querySelectorAll('.tree-stage').forEach((el) => {
    el.classList.remove('active');
  });

  const activeStageGroup = document.getElementById(`tree-stage-${currentStage}`);
  if (activeStageGroup) {
    activeStageGroup.classList.add('active');
  }

  // 2. Update Progress Bar Text
  const progressTextEl = document.querySelector('.progress-bar p');
  if (progressTextEl) {
    const bucketsInCurrentStage = currentStage === 4 ? 3 : buckets % 3;
    progressTextEl.textContent = `Tree growth: ${bucketsInCurrentStage} / 3 buckets completed (Stage ${currentStage} of 4)`;
  }
}

/**
 * Call this function whenever an activity (Breathe, Reflection, Mood Log) is completed!
 */
function completeActivity() {
  let buckets = getLoggedBuckets();
  const oldStage = getStageFromBuckets(buckets);

  buckets += 1;
  localStorage.setItem(STORAGE_KEY, buckets);

  const newStage = getStageFromBuckets(buckets);

  // Trigger UI Update
  updateGardenUI();

  // Optional: Trigger celebration / alert on stage progression
  if (newStage > oldStage) {
    console.log(`🎉 Congratulations! Your tree grew to Stage ${newStage}!`);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateGardenUI();
});