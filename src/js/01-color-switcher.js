const switcherOn = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId;
const DELAY = 1000;

switcherOn.startBtn.addEventListener('click', onBtnStartClick);
switcherOn.stopBtn.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  intervalId = setIntervalImmediately(
    () => (document.body.style.backgroundColor = getRandomHexColor()),
    DELAY,
  );
  toggleBtnsActiveStatus();
}

function toggleBtnsActiveStatus() {
  switcherOn.startBtn.toggleAttribute('disabled');
  switcherOn.stopBtn.toggleAttribute('disabled');
}

function onBtnStopClick() {
  clearInterval(intervalId);
  toggleBtnsActiveStatus();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setIntervalImmediately(func, interval) {
  func();
  return setInterval(func, interval);
}
