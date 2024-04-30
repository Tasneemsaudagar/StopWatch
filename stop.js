let timer;
let isRunning = false;
let startTime;
let lapStartTime;
let lapCount = 1;

const display = document.getElementById('timer');
const startStopBtn = document.getElementById('startStopBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', function () {
    if (!isRunning) {
        startStopBtn.textContent = 'Stop';
        startStopBtn.style.backgroundColor ="red" ;
        startStopBtn.classList.remove('start-btn');
        startStopBtn.classList.add('stop-btn');
        lapResetBtn.textContent = 'Lap';
        lapResetBtn.style.backgroundColor ="#33c0b8"
        lapResetBtn.style.color = "#000"
        startTime = Date.now() - (lapStartTime || 0);
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    } else {
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = "green";
        startStopBtn.classList.remove('stop-btn');
        startStopBtn.classList.add('start-btn');
        lapResetBtn.textContent = 'Reset';
        lapResetBtn.style.backgroundColor = "blue" ;
        lapResetBtn.style.color = "#fff" ;
        clearInterval(timer);
        isRunning = false;
    }
});

lapResetBtn.addEventListener('click', function () {
    if (!isRunning) {
        display.textContent = '00:00:00.00';
        lapsList.innerHTML = '';
        lapCount = 1;
    } else {
        const lapTime = Date.now() - startTime;
        const formattedLapTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.classList.add('lap');
        lapItem.textContent = `Lap ${lapCount} :  ${formattedLapTime} `;
        lapsList.prepend(lapItem);
        lapCount++;
        lapStartTime = Date.now();
    
    }
});

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function pad(num) {
    return num.toString().padStart(2, "0");
}


function formatTime(time) {
    const hours = Math.floor(time/1000/60/60) ;
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

