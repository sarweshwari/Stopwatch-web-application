let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

function formatTime(ms) {
    let date = new Date(ms);
    return date.toISOString().substr(11, 8); // HH:MM:SS
}

function updateDisplay() {
    const currentTime = isRunning ? elapsedTime + (Date.now() - startTime) : elapsedTime;
    timeDisplay.textContent = formatTime(currentTime);
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    isRunning = true;
    startStopBtn.textContent = 'Pause';
    updateDisplay();
    stopwatchInterval = setInterval(updateDisplay, 100);
}

function stopStopwatch() {
    elapsedTime += Date.now() - startTime;
    clearInterval(stopwatchInterval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    isRunning = false;
    elapsedTime = 0;
    lapTimes = [];
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    startStopBtn.textContent = 'Start';
}

function addLapTime() {
    const lapTime = formatTime(elapsedTime + (Date.now() - startTime));
    lapTimes.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLapTime);
