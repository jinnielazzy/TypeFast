import Box from "./box";
import LinkedList from './linkedlist';
import Node from './node';

const randomWords = require('random-words');

class Game {
  constructor(c) {
    // initialize board, boxes, speed, music
    this.c = c;
    this.score = document.getElementById("score");
    this.audio = document.getElementById("audio");
    this.input = document.getElementById("user-input");
    this.inputField = document.getElementById("text");
    this.startHeader = document.getElementById("start-header");
    this.startBtn = document.getElementById("start-btn");
    this.highest = document.querySelector("score-board");
    this.highestBoard = document.getElementById("score-broad");

    this.initializeGame();
    this.animate = this.animate.bind(this);
    this.spawnRandomObject = this.spawnRandomObject.bind(this);
  } 

  initializeGame() {
    this.currentScore = 0;
    this.highScore = parseInt(localStorage.getItem("score")) || 0;
    this.gameOver = false;
    this.spawnY = 25;
    this.spawnRate = 2000; 
    this.spawnRateOfDescent = 0.4;
    this.lastSpawn = -1;
    this.boxes = new LinkedList();
    this.words = new Map();
    this.startTime = Date.now();
    this.audio.loop = true;
    this.audio.load();
    this.listenToInput();
  }
  
  // function to start the gamewet
  playGame() {    
    this.score.style.display = "block";
    this.score.innerText = "Score: 0";
    this.input.style.display = "flex";   
    this.inputField.value = "";                       
    this.audio.play();
    this.animate();
  }
    
  listenToInput() {
    this.input.addEventListener("input", e => {
      const userInput = e.target.value;
      if (this.words.has(userInput)) {
        let node = this.words.get(userInput);
        let box = node.val;

        this.boxes.remove(node);
        this.words.delete(userInput);

        e.target.value = "";
        this.currentScore++;
        this.score.innerText = `Score: ${this.currentScore}`;
      }
    })
  }
  
  animate() {
    if (!this.gameOver) {
      // console.log(this.boxes);
      // console.log(this.words);
      
      const time = Date.now();
      if (this.currentScore > this.highScore) this.highestBoard.innerText = this.currentScore;
      
      if (time - this.startTime > 60000) {
        this.spawnRateOfDescent += 0.5;
        if (this.spawnRate <= 600) {
          this.spawnRate -= 100;
        } else {
          this.spawnRate -= 600;
        } 
        
        this.startTime = time;
      }
      
      if (time > (this.lastSpawn + this.spawnRate)) {
        this.lastSpawn = time;
        this.spawnRandomObject();
      }
      
      requestAnimationFrame(this.animate);
      
      this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
    
      this.boxes.reset();
      while (this.boxes.hasNext()) {
        let box = this.boxes.next().val;
        box.y += this.spawnRateOfDescent;
        this.c.beginPath();
        this.c.fillStyle = "#B6FF00";
        this.c.fillText(box.text, box.x, box.y);
        this.c.font = "30px Iceland";
        this.c.closePath();
      }
      
      if (this.boxes.head.val.y >= this.c.canvas.height) this.gameOver = true;
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
    const word = randomWords();

    let x = Math.random() * 900;

    // console.log(word);
    // console.log(`x:${x}, len: ${this.c.measureText(word).width}`); 
    // console.log(`total width: ${x + this.c.measureText(word).width}`);
    while (x + this.c.measureText(word).width > this.c.canvas.width + 20) {
      // console.log("out of bound");
      x -= 100;
    }

    // console.log(`x:${x}, y:${this.spawnY}`)
    let box = new Box(this.c, x, this.spawnY, word);
    let node = new Node(box);
    this.boxes.insert(node);
    this.words.set(word, node);
  }

}

export default Game;