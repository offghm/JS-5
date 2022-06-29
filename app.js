const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
let time = 0;
const timeEL = document.querySelector("#time");
const board = document.querySelector("#board");
let score = 0;
const colors = [
  "#e74c3c",
  "#8e44ad",
  "#3498db",
  "#8f3858",
  "#ba8fdc",
  "#d4aa68",
];

startBtn.addEventListener("click", (event) => {
  event.preventDefault(); // удаляем  # при нажатии начать игру
  screens[0].classList.add("up"); // поднимаем экран
});

timeList.addEventListener("click", (event) => {
  // обращаемся ко всему блоку
  if (event.target.classList.contains("time-btn")) {
    // contains проверяет есть ли касс (евент таргет = тот элемент по которому мы клик) это все что бы работал ток нажатие на кнопку
    time = parseInt(event.target.getAttribute("data-time"));
    // Обозначаем время беря данные из хтмлДАТА parseInt превращает строку в число. (гет атрибут получает атрибут)
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(deсreaseTime, 1000);
  // делает что то с определенным интервалом 1000мс = 1сек
  createRandomCircle();
  setTime(time);
}

function deсreaseTime() {
  if (time === 0) {
    // что бы не шло в минус
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      // что бы когда меньше 10 сек был 0 впереди
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEL.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEL.parentNode.classList.add("hide"); // родителя таймЕЛ
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = getRandomCollor();
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomCollor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
