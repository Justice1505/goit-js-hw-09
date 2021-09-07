import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const input = document.querySelector('#date-selector');
console.log(input);
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
const stopBtn = document.querySelector('button[data-stop]');
console.log(stopBtn);
let timerId = null;
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMins = document.querySelector('.value[data-minutes]');
const timerSecs = document.querySelector('.value[data-seconds]');
class Timer {
  constructor({ selector, targetDate }) {
    this._selector = selector;
    this._targetDate = targetDate;
  }
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = this.pad(Math.floor(ms / day));
    const hours = this.pad(Math.floor((ms % day) / hour));
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));
    timerDays.textContent = days;
    timerHours.textContent = hours;
    timerMins.textContent = minutes;
    timerSecs.textContent = seconds;
    return { days, hours, minutes, seconds };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  start() {
    this.timerId = setInterval(() => {
      const currentDate = Date.now();
      const time = this._targetDate - currentDate;
      this.convertMs(time);
      if (time <= 0) {
        this.stop();
      }
    }, 1000);
  }
  stop() {
    {
      clearInterval(this.timerId);
      timerDays.textContent = '00';
      timerHours.textContent = '00';
      timerMins.textContent = '00';
      timerSecs.textContent = '00';
      this.isActive = false;
      startBtn.disabled = true;
    }
  }
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const targetDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    if (targetDate <= currentDate) {
      startBtn.disabled = true;
      alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      const timer = new Timer({
        selector: '_timer',
        targetDate: selectedDates[0].getTime(),
      });
      startBtn.addEventListener('click', timer.start.bind(timer));
      stopBtn.addEventListener('click', timer.stop.bind(timer));
    }
  },
};
