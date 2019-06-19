import Box from "./box";
const randomWords = require('random-words');

class Game {
  constructor(c) {
    // initialize board, boxes, speed, music
    this.c = c;
    this.score = document.getElementById("score");
    this.audio = document.getElementById("audio");
    this.music = document.getElementById("music");
    this.input = document.getElementById("input");
    this.startHeader = document.getElementById("start-header");
    this.startBtn = document.getElementById("start-btn");

    // when game starts
    this.initializeGame();
    this.animate = this.animate.bind(this);
    this.spawnRandomObject = this.spawnRandomObject.bind(this);
  } 

  initializeGame() {
    this.currentScore = 0;
    this.gameOver = false;
    this.spawnY = 25;
    this.spawnRate = 1500;
    this.spawnRateOfDescent = 3;
    this.lastSpawn = -1;
    this.boxes = [];
    this.startTime = Date.now();
    this.audio.load();
  }

  // function to start the game
  playGame() {
    this.music.style.display = "flex";
    this.input.style.display = "flex";
    this.music.addEventListener("click", () => {
      const span = this.music.firstChild;
      if (this.music.className === "btn-mute") {
        this.audio.pause();
        this.music.className = "btn-unmute"
        span.innerHTML = "PLAY"
      } else {
        this.audio.play();
        this.music.className = "btn-mute"
        span.innerHTML = "PAUSE"
      }
    })

    this.audio.play();
    this.animate();
   }

  animate() {
    if (!this.gameOver) {
      this.input.addEventListener("input", e => {
        if (e.target.value === this.boxes[0].text) {
          this.boxes.shift();
          e.target.value = "";
          this.currentScore++;
          this.score.innerText = "Score: " + this.currentScore;
        }
      })

      const time = Date.now();

      if (time - this.startTime > 60000) {
        this.spawnRateOfDescent += 0.5;
        this.startTime = time;
      }

      if (time > (this.lastSpawn + this.spawnRate)) {
        this.lastSpawn = time;
        this.spawnRandomObject();
      }

      requestAnimationFrame(this.animate);

      this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);

      // this.c.beginPath();
      // this.c.moveTo(0, this.spawnY);
      // this.c.lineTo(this.c.canvas.width, this.spawnY);
      // this.c.stroke();

      for (let i = 0; i < this.boxes.length; i++) {
        const box = this.boxes[i];
        box.y += this.spawnRateOfDescent;
        this.c.beginPath();
        this.c.fillStyle = "#000000";
        this.c.fillText(box.text, box.x, box.y);
        this.c.font = "30px fantasy"
        this.c.closePath();
      }

      if (this.boxes[0].y >= 800) {
        this.gameOver = true;
      }
    } else {
      // this.startHeader.innerHTML = "RESTART"
      this.startHeader.style.display = "flex";
      this.startBtn.innerHTML = "<span>Restart Game</span>";
    }
  }

  // randomString() {
  //   let result = "";
  //   const characters = "abcdefghijklmnopqrstuvwxyz";
  //   const length = Math.floor(Math.random() * 8);
  //   const wordLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * wordLength));
  //   }
  //   return result;
  // }

  spawnRandomObject() {
    // const str = this.randomString();
    const str = randomWords();
    let x = Math.random() * (this.c.canvas.width);
    console.log(x + this.c.measureText(str).width);
    while (x + this.c.measureText(str).width > 1000) {
      x -= 100;
    }
    console.log("now x " + x);
    const box = new Box(this.c, 
      x,
      this.spawnY,
      str
    );

    this.boxes.push(box);
  }

}

export default Game;