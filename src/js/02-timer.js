import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const startBtn = document.querySelector('.start');
const timerDays = document.querySelector('.days');
const timerHrs = document.querySelector('.hours');
const timerMins = document.querySelector('.minutes');
const timerSecs = document.querySelector('.seconds');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let selectedDate = date.selectedDates[0];
    let selectedTimeMs = selectedDate.getTime();
    let currentDate = new Date();
    let currentTimeMs = currentDate.getTime();
    startBtn.removeAttribute('disabled');
    if (selectedTimeMs < currentTimeMs) {
      window.alert('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
    } else {
      //   const crntDays = convertMs(currentTimeMs).days;
      //   const crntHrs = convertMs(currentTimeMs).hours;
      //   const crntMins = convertMs(currentTimeMs).minutes;
      //   const crntSecs = convertMs(currentTimeMs).seconds;
      //   const days = convertMs(selectedTimeMs).days;
      //   const hrs = convertMs(selectedTimeMs).hours;
      //   const mins = convertMs(selectedTimeMs).minutes;
      //   const secs = convertMs(selectedTimeMs).seconds;
      const leftDays = addLeadingZero(
        convertMs(selectedTimeMs - currentTimeMs).days
      );
      const leftHrs = addLeadingZero(
        convertMs(selectedTimeMs - currentTimeMs).hours
      );
      const leftMins = addLeadingZero(
        convertMs(selectedTimeMs - currentTimeMs).minutes
      );
      const leftSecs = addLeadingZero(
        convertMs(selectedTimeMs - currentTimeMs).seconds
      );
      //   console.log(crntDays);
      //   console.log(crntHrs);
      //   console.log(crntMins);
      //   console.log(crntSecs);
      //   console.log(days);
      //   console.log(hrs);
      //   console.log(mins);
      //   console.log(secs);
      //   console.log(leftDays);
      //   console.log(leftHrs);
      //   console.log(leftMins);
      //   console.log(leftSecs);
      timerDays.innerHTML = leftDays;
      timerHrs.innerHTML = leftHrs;
      timerMins.innerHTML = leftMins;
      timerSecs.innerHTML = leftSecs;
    }
  },
};
const date = flatpickr('#datetime-picker', options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  let valueStr = value.toString();
  //   console.log(valueStr.padStart(2, '0'));
  return valueStr.padStart(2, '0');
}
startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', () => {
  //   let leftDays = Number(timerDays.innerHTML);
  //   let leftHrs = Number(timerHrs.innerHTML);
  //   let leftMins = Number(timerMins.innerHTML);
  let leftSecs = Number(timerSecs.innerHTML);
  //   console.log(leftDays, leftHrs, leftMins, leftSecs);
  if (leftSecs !== 0) {
    startBtn.removeAttribute('disabled');
    let selectedDate = date.selectedDates[0];
    let selectedTimeMs = selectedDate.getTime();
    let currentDate = new Date();
    let currentTimeMs = currentDate.getTime();
    let timeLeftMs = selectedTimeMs - currentTimeMs;
    // console.log(selectedTimeMs - currentTimeMs);
    // console.log(convertMs(selectedTimeMs - currentTimeMs));
    timerId = setInterval(() => {
      timeLeftMs -= 1000;
      //   console.log(timeLeftMs);
      const leftDays = addLeadingZero(convertMs(timeLeftMs).days);
      const leftHrs = addLeadingZero(convertMs(timeLeftMs).hours);
      const leftMins = addLeadingZero(convertMs(timeLeftMs).minutes);
      const leftSecs = addLeadingZero(convertMs(timeLeftMs).seconds);
      timerDays.innerHTML = leftDays;
      timerHrs.innerHTML = leftHrs;
      timerMins.innerHTML = leftMins;
      timerSecs.innerHTML = leftSecs;
      if (timeLeftMs < 1000) {
        clearInterval(timerId);
      }
    }, 1000);
  }
});
