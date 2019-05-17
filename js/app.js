import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext('2d');
   
  // let game = new Game(c);

  const startBtn = document.getElementById("start-btn");
  const startHeader = document.getElementById("start-header");  
  const audio = document.getElementById("audio");
  const music = document.getElementById("music");

  audio.autoplay = false;
  music.style.display = "none";

  startBtn.addEventListener("click", () => {
    startHeader.style.display = "none";
    startGame();
  })

  function startGame() {
    let game = new Game(c);
    game.playGame();
  }
});