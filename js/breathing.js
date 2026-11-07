// One-minute guided breathing: 3s in, 2s hold, 6s out
const SESSION_SECONDS = 60;

const backBtn = document.getElementById('breathing-back');
const bubble = document.getElementById('bubble');
const bubbleTitle = document.getElementById('bubble-title');
const bubbleSub = document.getElementById('bubble-sub');
const pauseBtn = document.getElementById('breathing-pause');

let elapsed = 0;
let timer = null;
let started = false;

function getPhase(seconds) {
  const s = seconds % 11; // one breath = 3 + 2 + 6 seconds
  if (s < 3) return { name: 'inhale', label: 'Breathe in', left: 3 - s };
  if (s < 5) return { name: 'hold', label: 'Hold', left: 5 - s };
  return { name: 'exhale', label: 'Breathe out', left: 11 - s };
}

function showPhase() {
  const phase = getPhase(elapsed);
  bubbleTitle.textContent = phase.label;
  bubbleSub.textContent = phase.left + 's';

  if (phase.name === 'inhale') {
    bubble.style.transition = 'transform 3s ease-in-out';
    bubble.style.transform = 'scale(1.35)';
  } else if (phase.name === 'exhale') {
    bubble.style.transition = 'transform 6s ease-in-out';
    bubble.style.transform = 'scale(0.8)';
  }
  // during "hold" the bubble just stays big
}

function tick() {
  elapsed = elapsed + 1;
  if (elapsed >= SESSION_SECONDS) {
    finish();
  } else {
    showPhase();
  }
}

function startSession() {
  elapsed = 0;
  started = true;
  showPhase();
  timer = setInterval(tick, 1000);
  pauseBtn.textContent = 'Pause';
  pauseBtn.classList.remove('hidden');
}

function finish() {
  clearInterval(timer);
  timer = null;
  started = false;
  bubbleTitle.textContent = 'Well done';
  bubbleSub.textContent = 'Tap to go again';
  bubble.style.transition = 'transform 1s ease-in-out';
  bubble.style.transform = 'scale(1)';
  pauseBtn.classList.add('hidden');
  // TODO: give the tree 1 bucket of water here
}

function resetSession() {
  clearInterval(timer);
  timer = null;
  started = false;
  elapsed = 0;
  bubbleTitle.textContent = 'Tap to begin';
  bubbleSub.textContent = '1 minute';
  bubble.style.transition = 'none';
  bubble.style.transform = 'scale(1)';
  pauseBtn.classList.add('hidden');
}

// Click the bubble to start
bubble.addEventListener('click', function () {
  if (!started) {
    startSession();
  }
});

// Pause / resume
pauseBtn.addEventListener('click', function () {
  if (timer) {
    clearInterval(timer);
    timer = null;
    pauseBtn.textContent = 'Resume';
  } else {
    timer = setInterval(tick, 1000);
    pauseBtn.textContent = 'Pause';
  }
});

// Back goes to the main page
backBtn.addEventListener('click', function () {
  resetSession();
  window.location.href = 'index.html';
});

// Start in the ready state
resetSession();