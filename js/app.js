import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const c = canvas.getContext('2d');

  const startBtn = document.querySelector("button");
  const score = document.querySelector("score");
  const highestscore = document.querySelector("#highest-score");
  const value = localStorage.getItem("score");
  const game = new Game(c);
  
  let highest = 0;
  console.log(value)
  if (value !== null) highest = parseInt(value);
  
  highestscore.innerHTML = `<span>Highest: ${highest} </span>`;

  // console.log(startBtn);
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