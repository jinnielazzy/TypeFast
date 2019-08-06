import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext('2d');

  c.canvas.width = 800;
  c.canvas.height = 600;

  const window = document;
  const startBtn = document.getElementById("start-btn");
  const startHeader = document.getElementById("start-header");  
  const audio = document.getElementById("audio");
  const music = document.getElementById("music");
  const input = document.getElementById("input");
  const score = document.getElementById("score");

  audio.autoplay = false;
  music.style.display = "none";
  input.style.display = "none";
  // score.style.display = "none";

  const startGameHelper = () => {
    startHeader.style.display = "none";
    startGame();
  }

  startBtn.addEventListener("click", () => {
    startGameHelper();
  })
  
  const config = {
    childList: true,
  };

  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const target = mutation.target;
    
        // Animation here
        target.classList.add('glow');
        setTimeout(function () {
          target.classList.remove('glow')
        }, 500);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(score, config);

  function startGame() {
    let game = new Game(c);
    game.playGame();
  }
});