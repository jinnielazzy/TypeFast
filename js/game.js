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
    this.lifeBoard = document.querySelector(".life");

    this.initializeGame();
    this.animate = this.animate.bind(this);
    this.spawnRandomObject = this.spawnRandomObject.bind(this);
  } 

  initializeGame() {
    this.life = 3;
    this.currentScore = 0;
    this.highScore = parseInt(localStorage.getItem("score")) || 0;
    this.gameOver = true;
    this.pause = true;
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
    this.listenToKey();
  }
  
  // function to start the gamewet
  playGame() {    
    this.startHeader.style.display = "none";
    this.score.style.display = "block";
    this.score.innerText = "Score: 0";
    this.input.style.display = "flex";   
    this.inputField.value = "";   
    this.inputField.focus();                    
    this.audio.play();
    this.gameOver = false;
    this.pause = false;
    this.animate();
  }
    
  keyDown(e) {
    if (e.keyCode === 27 && !this.gameOver) this.inputField.value = "";
    if (e.keyCode === 13) {
      if (this.gameOver) this.playGame();
      // else this.pause = !this.pause;
    }
  }

  listenToKey() {
    document.addEventListener("keydown", (e) => this.keyDown(e));
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
      
      this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
      requestAnimationFrame(this.animate);
      
      if (this.boxes.size === 0) return;
      console.log(this.boxes.head.val.text)
      
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
      
      if (this.boxes.head.val.y >= this.c.canvas.height) {
        this.life--;
        this.lifeBoard.innerHTML = `<span>life: ${this.life} </span>`;
        if (this.life === 0) this.gameOver = true;
        let head = this.boxes.head;
        this.boxes.remove(head);
      }
    } else {
      this.startHeader.style.display = "flex";
      this.startBtn.innerHTML = "<span style='style: >Restart Game</span>";

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

    while (x + this.c.measureText(word).width > this.c.canvas.width + 20) {
      x -= 100;
    }

    let box = new Box(this.c, x, this.spawnY, word);
    let node = new Node(box);
    this.boxes.insert(node);
    this.words.set(word, node);
  }

}

export default Game;