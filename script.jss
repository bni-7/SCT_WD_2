let startTime = 0, elapsedTime = 0, timerInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('time-display');
const lapsList = document.getElementById('laps');

const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');

function startTimer() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 1000); // Update every second
        running = true;
        startButton.textContent = 'Running...';
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
    startButton.textContent = 'Start';
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    elapsedTime = 0;
    running = false;
    lapsList.innerHTML = '';
    lapCounter = 1;
    startButton.textContent = 'Start';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function recordLap() {
    if (running) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
        lapsList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
