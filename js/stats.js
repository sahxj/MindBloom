// Mood scores mapping to calculate mathematical average
const MOOD_SCORES = {
    'Low': 1,
    'Meh': 2,
    'Okay': 3,
    'Good': 4,
    'Great': 5
};

const MOOD_LABELS = {
    1: 'Low',
    2: 'Meh',
    3: 'Okay',
    4: 'Good',
    5: 'Great'
};

function renderStats() {
    // 1. Calculate Mindful Moments from mindbloom-progress stats
    const progressData = JSON.parse(localStorage.getItem('mindbloom-progress') || '{}');
    const stats = progressData.stats || { breaths: 0, journals: 0, moods: 0, music: 0 };
    
    const totalMoments = (stats.breaths || 0) + (stats.journals || 0) + (stats.moods || 0) + (stats.music || 0);

    // Update Mindful Moments UI
    const momentsCountEl = document.getElementById('mindful-moments-count');
    const insightTextEl = document.getElementById('insight-text');
    
    if (momentsCountEl) {
        momentsCountEl.textContent = totalMoments;
    }
    
    if (insightTextEl) {
        insightTextEl.textContent = `You've completed ${totalMoments} mindful moment${totalMoments === 1 ? '' : 's'}. Every small step counts, so keep going at your own pace.`;
    }

    // 2. Calculate Average Mood from saved history
    const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    const singleMood = localStorage.getItem('savedMood');

    let allMoods = [...history];
    if (singleMood && allMoods.length === 0) {
        allMoods.push(singleMood);
    }

    const moodDisplayEl = document.getElementById('average-mood-display');
    if (moodDisplayEl) {
        if (allMoods.length === 0) {
            moodDisplayEl.textContent = 'No logs';
        } else {
            const sum = allMoods.reduce((acc, m) => acc + (MOOD_SCORES[m] || 3), 0);
            const avg = Math.round(sum / allMoods.length);
            moodDisplayEl.textContent = MOOD_LABELS[avg] || 'Okay';
        }
    }
}

document.addEventListener('DOMContentLoaded', renderStats);