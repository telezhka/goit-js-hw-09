function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const body = document.querySelector('body');
startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    let color = getRandomHexColor();
    body.style.backgroundColor = color;
    console.log(color);
  }, 1000);
});
stopBtn.addEventListener('click', () => {
  startBtn.removeAttribute('disabled');
  clearInterval(timerId);
});
