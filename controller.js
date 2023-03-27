let hours = 00;
let minutes = 00;
let seconds = 00;
let milliseconds = 00;
let timeElapsed
let appendTens = document.getElementById("tens")
let appendSeconds = document.getElementById("seconds")
let appendMinutes = document.getElementById("minutes")
let appendHours = document.getElementById("hours")
let buttonStart = document.getElementById('button-start');
let buttonStop = document.getElementById('button-stop');
let buttonReset = document.getElementById('button-reset');
let buttonLap = document.getElementById('button-lap');
let lapTimeList = document.getElementById('lap-time-list');
let lapTime = document.getElementById('lap-time');
let readoutUpdateRequestID;
let startTime;
let stopTime;
let stopwatchOn;
let stopwatchStopped;
let lastLap = { hours: 0, minutes: 0, seconds: 0, ten: 0 };


buttonStart.addEventListener("click", startStopwatch);
buttonStop.addEventListener("click", stopStopwatch);
buttonReset.addEventListener("click", resetStopwatch);
buttonLap.addEventListener("click", lap);


function startStopwatch() {
  buttonStart.style.display = 'none'
  buttonStop.style.display = 'inline-block'
  buttonLap.style.display = 'inline-block'
  if (stopwatchOn) {
    return;
  }
  if (stopwatchStopped) {
    startTime += Date.now() - stopTime;
    stopwatchOn = true;
    stopwatchStopped = false;
    readoutUpdateRequestID = window.requestAnimationFrame(
      displayTimeElapsed
    );
    return;
  }
  startTime = Date.now();
  stopwatchOn = true;
  readoutUpdateRequestID = window.requestAnimationFrame(
    displayTimeElapsed
  );
}

function stopStopwatch() {
  buttonStop.style.display = 'none'
  buttonStart.style.display = 'inline-block'
  buttonLap.style.display = 'none'
  if (!stopwatchOn) {
    return;
  }
  stopTime = Date.now();
  console.log(stopTime)
  stopwatchOn = false;
  stopwatchStopped = true;
  window.cancelAnimationFrame(readoutUpdateRequestID);
}

function resetStopwatch() {
  lapTimeList.style.display = 'none'
  lapTime.style.display = 'none'
  buttonStop.style.display = 'none'
  buttonLap.style.display = 'none'
  buttonStart.style.display = 'inline-block'
  lapTimeList.innerHTML = ''
  if (stopwatchOn) {
    stopStopwatch();
  }
  stopwatchOn = false;
  stopwatchStopped = false;
  appendTens.innerHTML = '00'
  appendSeconds.innerHTML = '00'
  appendMinutes.innerHTML = '00'
  appendHours.innerHTML = '00'
}

function leftPad(value) {
  return value < 10 ? "0" + value : value;
}

function lap() {
  lapTimeList.style.display = 'block'
  lapTime.style.display = 'block'
  const li = document.createElement("li");
  let lapHours = hours - lastLap.hours;
  let lapMinutes = minutes - lastLap.minutes;
  if (lapMinutes < 0) {
    lapMinutes = minutes - lastLap.minutes + 60;
  }
  let lapSeconds = seconds - lastLap.seconds;
  if (lapSeconds < 0) {
    lapSeconds = seconds - lastLap.seconds + 60;
  }
  let lapTens = milliseconds - lastLap.ten;

  if (lapTens < 0) {
    lapTens = milliseconds - lastLap.ten + 100;
  }
  lastLap = {
    ten: milliseconds,
    seconds: seconds,
    minutes: minutes,
    hours: hours
  };
  let showingLapTime =
    leftPad(lapHours) +
    ":" +
    leftPad(lapMinutes) +
    ":" +
    leftPad(lapSeconds) +
    ":" +
    leftPad(lapTens)
  const textNode = document.createTextNode(showingLapTime)
  li.append(textNode);
  lapTimeList.insertBefore(li, lapTimeList.children[0])
}

function displayTimeElapsed() {
  timeElapsed = Date.now() - startTime;
  milliseconds = Math.floor((timeElapsed % 1000) / 10);
  if (milliseconds < 10) {
    appendTens.innerHTML = "0" + milliseconds;
  } else {
    appendTens.innerHTML = milliseconds;
  }
  seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
  if (seconds < 10) {
    appendSeconds.innerHTML = "0" + seconds;
  } else {
    appendSeconds.innerHTML = seconds;
  }
  minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes < 10) {
    appendMinutes.innerHTML = "0" + minutes;
  } else {
    appendMinutes.innerHTML = minutes;
  }
  hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (hours < 10) {
    appendHours.innerHTML = "0" + hours;
  } else {
    appendHours.innerHTML = hours;
  }
  readoutUpdateRequestID = window.requestAnimationFrame(
    displayTimeElapsed
  );
}














