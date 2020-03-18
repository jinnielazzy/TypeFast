import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext('2d');

  const startBtn = document.getElementById("start-btn");
  const startHeader = document.getElementById("start-header");  
  const audio = document.getElementById("audio");
  const score = document.getElementById("score");
  const score_board = document.getElementById("score-broad");

  let gameStart = false;
  let points = localStorage.getItem("score") || 0;

  score_board.innerHTML = `<span>Highest: ${points}</span>`;

  audio.autoplay = false;
  score.style.display = "none";

  const startGameHelper = () => {
    startHeader.style.display = "none";
    startGame();
  }

  startBtn.addEventListener("click", () => {
    startGameHelper();
  });
  
  // const config = {
  //   childList: true
  // };

  // const callback = (mutationsList, observer) => {
  //   for (const mutation of mutationsList) {
  //     if (mutation.type === "childList") {
  //       const target = mutation.target;
    
  //       // Animation here
  //       target.classList.add('glow');
  //       setTimeout(function () {
  //         target.classList.remove('glow')
  //       }, 500);
  //     }
  //   }
  // };

  // const observer = new MutationObserver(callback);
  // observer.observe(score, config);

  function startGame() {
    let game = new Game(c);

    // c.canvas.width = window.innerWidth;
    // c.canvas.height = window.innerHeight;

    // console.log(c.canvas.width);
    // console.log(c.canvas.height);
    // console.dir(canvas)

    game.playGame();
  }
});