import Box from "./box";
const randomWords = require('random-words');

class Game {
  constructor(c) {
    // initialize board, boxes, speed, music
    this.c = c;
    this.score = document.getElementById("score");
    this.audio = document.getElementById("audio");
    // this.music = document.getElementById("music");
    this.input = document.getElementById("user-input");
    // this.inputField = document.getElementById("text");
    this.startHeader = document.getElementById("start-header");
    this.startBtn = document.getElementById("start-btn");
    this.highest = document.querySelector("score-board");
    this.highestBoard = document.getElementById("score-broad");


    // when game starts
    this.initializeGame();
    this.animate = this.animate.bind(this);
    this.spawnRandomObject = this.spawnRandomObject.bind(this);
  } 

  initializeGame() {
    this.currentScore = 0;
    this.highScore = parseInt(localStorage.getItem("score")) || 0;
    this.gameOver = false;
    this.spawnY = 25;
    this.spawnRate = 1500;
    this.spawnRateOfDescent = 0.4;
    this.lastSpawn = -1;
    this.boxes = [];
    this.words = [];
    this.startTime = Date.now();
    this.audio.load();
  }

  // function to start the gamewet
  playGame() {    
    this.score.style.display = "block";
    this.score.innerText = "Score: 0";
    // this.music.style.display = "flex"; 
    // this.input.style.display = "flex";
    this.input.innerHTML = `<input type='text'
                            placeholder='Start Typing....'
                            id='text'
                            autofocus>`


    // this.music.addEventListener("click", () => {
    //   const span = this.music.firstChild;
    //   if (this.music.className === "btn-mute") {
    //     this.audio.pause();
    //     this.music.className = "btn-unmute"
    //     span.innerHTML = "PLAY"
    //   } else {
    //     this.audio.play();
    //     this.music.className = "btn-mute"
    //     span.innerHTML = "PAUSE"
    //   }
    // })
    
    this.audio.play();
    this.animate();
  }
  
  listenToInput() {
    this.input.addEventListener("input", e => {
      const userInput = e.target.value;
      if (this.words.includes(userInput)) {
        const box = this.boxes.find(box => box.text === userInput);
        this.words = this.words.filter(word => word !== userInput);
        this.boxes = this.boxes.filter(box => box.text != userInput);

        this.c.rect(box.x, box.y, 150, 100);
        this.c.stroke();

        e.target.value = "";
        this.currentScore++;
        this.score.innerText = "Score: " + this.currentScore;
      }

      if (this.currentScore > this.highScore) this.highestBoard.innerText = this.currentScore;
    })
  }


  animate() {
    if (!this.gameOver) {
    
      this.listenToInput();
      
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
        this.c.fillStyle = "#B6FF00";
        this.c.fillText(box.text, box.x, box.y);
        this.c.font = "30px Iceland";
        this.c.closePath();
      }

      if (this.boxes[0].y >= this.c.canvas.height) {
        this.gameOver = true;
        // this.inputField.value = "";
      }
    } else {
      this.startHeader.style.display = "flex";
      this.startBtn.innerHTML = "<span>Restart Game</span>";

      let highestScore = localStorage.getItem("score");
      highestScore = Math.max(highestScore, this.currentScore);
      localStorage.setItem("score", highestScore);

      this.score.innerText = "";
      this.audio.pause();
      this.initializeGame();
    }
  }

  spawnRandomObject() {
    // const str = this.randomString();
    const word = randomWords();

    let x = Math.random() * (this.c.canvas.width);

    while (x + this.c.measureText(word).width > this.c.canvas.width) {
      x -= 100;
    }

    const box = new Box(this.c, x, this.spawnY, word);
    
    this.words.push(word);
    this.boxes.push(box);
  }

}

export default Game;