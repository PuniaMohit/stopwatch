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
let onlyForFirstTime



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
  let onlyForFirstTime = 0
}

function stopStopwatch() {
  // lapTime.style.display = 'block'
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
  // setTimerReadout("0s 00");
  appendTens.innerHTML = '00'
  appendSeconds.innerHTML = '00'
  appendMinutes.innerHTML = '00'
  appendHours.innerHTML = '00'
}

function lap() {
  lapTimeList.style.display = 'block'
  lapTime.style.display = 'block'
  let lapTimeFirst
  let lapTimeShowingSecondLast
  let lapTimeShowingLast
  let forDifference = 0
  let arr=[]
  // let lapTimeShowing= hours + ':' + minutes + ':' + seconds + ':' + milliseconds
  const li = document.createElement("li");
  if (onlyForFirstTime === 0) {
    lapTimeFirst = hours + ':' + minutes + ':' + seconds + ':' + milliseconds
    lapTimeShowingSecondLast = hours + ':' + minutes + ':' + seconds + ':' + milliseconds
    const textNode = document.createTextNode(lapTimeFirst)
  }
  else {
    lapTimeShowingSecondLast = hours + ':' + minutes + ':' + seconds + ':' + milliseconds
    lapTimeShowingLast = hours + ':' + minutes + ':' + seconds + ':' + milliseconds
    arr.append(lapTimeShowingLast)

    if (forDifference == 1) {
      lapTimeShowingSecondLast = hours + ':' + minutes + ':' + seconds + ':' + milliseconds
    }     
    let difference = lapTimeShowingLast - lapTimeShowingSecondLast
    const textNode = document.createTextNode(difference)
  }
  li.append(textNode);
  // lapTimeList.appendChild(li)
  lapTimeList.insertBefore(li, lapTimeList.children[0])
  onlyForFirstTime = 1
}

function displayTimeElapsed() {
  timeElapsed = Date.now() - startTime;
  seconds = Math.floor(timeElapsed / 1000);
  appendSeconds.innerHTML = seconds;
  if (seconds > 59) {
    minutes++;
    console.log(minutes)
    appendMinutes.innerHTML = '0' + minutes;
    seconds = 0;
    appendSeconds.innerHTML = "0" + 0;
  }
  if (minutes > 9) {
    appendMinutes.innerHTML = minutes;
  }
  if (minutes > 59) {
    hours++;
    appendHours.innerHTML = '0' + hours;
    minutes = 0;
    appendMinutes.innerHTML = "0" + 0;
  }
  if (hours > 9) {
    appendHours.innerHTML = hours;
  }
  milliseconds = Math.floor((timeElapsed % 1000) / 10);
  appendTens.innerHTML = milliseconds
  // let timeString = `${seconds}s ${milliseconds}`;
  // console.log(timeString)
  // setTimerReadout(timeString);
  readoutUpdateRequestID = window.requestAnimationFrame(
    displayTimeElapsed
  );
}

// function setTimerReadout(text) {
//   document.querySelector(".stopwatchReadout").textContent = text;
// }













