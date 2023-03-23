let hours = 00;
let minutes = 00;
let seconds = 00;
let tens = 00;
let appendTens = document.getElementById("tens")
let appendSeconds = document.getElementById("seconds")
let appendMinutes = document.getElementById("minutes")
let appendHours = document.getElementById("hours")
let buttonStart = document.getElementById('button-start');
let buttonStop = document.getElementById('button-stop');
let buttonReset = document.getElementById('button-reset');
let buttonLap = document.getElementById('button-lap');
let lapTimeList = document.getElementById('lap-time-list');
let lapTimeBox = document.getElementById('lap-time-list');
let Interval;

buttonStart.onclick = function () {
  buttonStart.style.display = 'none'
  buttonStop.style.display = 'inline-block'
  buttonLap.style.display = 'inline-block'
  lapTimeList.style.display = 'block'
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
}

buttonStop.onclick = function () {
  clearInterval(Interval);
  buttonStop.style.display = 'none'
  buttonStart.style.display = 'inline-block'
  buttonLap.style.display = 'none'
}

buttonReset.onclick = function () {
  buttonStop.style.display = 'none'
  buttonLap.style.display = 'none'
  buttonStart.style.display = 'inline-block'
  lapTimeList.innerHTML = ''

  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  minutes='00';
  hours='00';
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;
  appendMinutes.innerHTML = minutes;
  appendHours.innerHTML = hours;
}

buttonLap.onclick = function () {
  lapTimeBox.style.display = 'block'
  var presentTime = hours + ':' + minutes + ':' + seconds + ':' + tens
  const li = document.createElement("li");
  const textNode = document.createTextNode(presentTime)
  li.append(textNode);
  lapTimeList.insertBefore(li, lapTimeList.children[0])
}


function startTimer() {
  tens++;
  if (tens <= 9) {
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    appendTens.innerHTML = tens;
  }

  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
  if (seconds > 59) {
    minutes++;
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
    appendHours.innerHTML = hours
  }

}