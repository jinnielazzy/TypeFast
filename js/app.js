import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext('2d');

  const startBtn = document.getElementById("start-btn");
  const startHeader = document.getElementById("start-header");  
  const audio = document.getElementById("audio");
  const music = document.getElementById("music");
  const input = document.getElementById("input");

  audio.autoplay = false;
  music.style.display = "none";
  input.style.display = "none";

  startBtn.addEventListener("click", () => {
    startHeader.style.display = "none";
    startGame();
  })

  function startGame() {
    let game = new Game(c);
    game.playGame();
  }
});