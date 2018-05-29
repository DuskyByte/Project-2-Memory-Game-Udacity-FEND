let timer = 0;

document.addEventListener("DOMContentLoaded", function(event) {
    const timerEvent = setInterval(startTimer, 1000);
});

function startTimer() {
    timer++;
    document.getElementById("time").innerHTML = formatTime(timer);
}

function formatTime(timer) {
    let hours = Math.floor(timer / 3600);
    let minutes = Math.floor((timer - (hours * 3600)) / 60);
    let seconds = timer - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
}