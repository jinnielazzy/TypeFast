import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext('2d');

  const startBtn = document.getElementById("start-btn");
  const score = document.getElementById("score");
  const score_board = document.getElementById("score-broad");
  const points = localStorage.getItem("score") || 0;

  const game = new Game(c);

  score_board.innerHTML = `<span>Highest: ${points} </span>`;
  score.style.display = "none";

  startBtn.addEventListener("click", () => {
    game.playGame();
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
});