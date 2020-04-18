import Box from "./box";
import LinkedList from './linkedlist';
import Node from './node';

const randomWords = require('random-words');

class Game {
  constructor(c) {
    // initialize board, boxes, speed, music
    this.c = c;
    this.boxes = new LinkedList();
    this.words = new Map();
  
    this.seleectElements();
    this.initializeGame();
    this.listenToInput();
    this.listenToKey();
    
    this.animate = this.animate.bind(this);
    this.spawnRandomObject = this.spawnRandomObject.bind(this);
  } 
  
  seleectElements() {
    this.score = document.querySelector("#current-score");
    this.audio = document.querySelector("audio");
    this.input = document.querySelector("#user-input input");
    this.startBtn = document.querySelector("#start-btn button");
    this.highest = document.querySelector("#highest-score");
    this.lifeBoard = document.querySelector("#life");
  }

  initializeGame() {
    this.life = 3;
    this.currentScore = 0;
    this.gameOver = true;
    this.spawnY = 25;
    this.spawnRate = 1000; 
    this.spawnRateOfDescent = 0.4;
    this.lastSpawn = -1;
    this.startTime = Date.now();
    this.audio.loop = true;
    this.audio.load();

    let value = localStorage.getItem("score");
    this.highestScore = value !== null ? parseInt(value) : 0;

  }
  
  // function to start the gamewet
  playGame() {    
    this.input.value = "";   
    this.input.focus();    
    this.startBtn.disabled = true;
    // this.audio.play();
    this.gameOver = false;
    this.pause = false;
    this.animate();
  }
    
  keyDown(e) {
    // clear input
    if (e.keyCode === 27 && !this.gameOver) this.input.value = "";
    // start game
    if (e.keyCode === 13 && this.gameOver) this.playGame();
  }

  listenToKey() {
    document.addEventListener("keydown", (e) => this.keyDown(e));
  }

  listenToInput() {
    this.input.addEventListener("input", e => {
      let userInput = e.target.value;
      if (this.words.has(userInput)) {
        let node = this.words.get(userInput);

        this.boxes.remove(node);
        this.words.delete(userInput);

        e.target.value = "";
        this.currentScore++;
        this.score.innerHTML = `<span>Score: ${this.currentScore} </span>`;
      }
    })
  }
  
  animate() {
    if (!this.gameOver) {  
      const time = Date.now();
      if (this.currentScore > this.highestScore) {
        this.highest.innerHTML = `<span>Highest: ${this.currentScore} </span>`;
        this.highestScore = this.currentScore;
      }
      
      if (time - this.startTime > 60000) {
        // this.spawnRateOfDescent += 0.5;
        // if (this.spawnRate <= 600) {
        //   this.spawnRate -= 100;
        // } else {
        //   this.spawnRate -= 600;
        // } 
        
        this.spawnRateOfDescent *= 1.5;
        this.spawnRate *= 0.99;
        this.startTime = time;
      }
      
      // console.log(time, this.lastSpawn, this.spawnRate);
      if (time - this.lastSpawn > this.spawnRate) {
        this.lastSpawn = time;
        this.spawnRandomObject();
      }
      
      this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
      requestAnimationFrame(this.animate);
      
      if (this.boxes.size === 0) return;
      
      this.boxes.reset();
      while (this.boxes.hasNext()) {
        let box = this.boxes.next().val;
        box.y += this.spawnRateOfDescent;
        this.c.beginPath();
        this.c.fillStyle = "rgb(34, 219, 43)";
        this.c.fillText(box.text, box.x, box.y);
        this.c.font = "2em 'Noticia Text', serif";
        this.c.closePath();
      }
      
      if (this.boxes.head.val.y >= this.c.canvas.height) {
        this.life--;
        console.log(this.life);
        this.lifeBoard.innerHTML = `<span>life: ${this.life} </span>`;
        if (this.life === 0) this.gameOver = true;
        let head = this.boxes.head;
        this.boxes.remove(head);
        this.words.delete(head.val.text);
      }
    } else {
      this.boxes.initialize();
      this.words.clear();
      this.startBtn.disabled = false;
      this.startBtn.innerText = "Restart Game";
      localStorage.setItem("score", this.highestScore);

      this.score.innerHTML = `<span>Score: 0</span>`;
      this.audio.pause();
      this.initializeGame();
    }
  }

  spawnRandomObject() {
    const word = randomWords();
    let x = Math.random() * 900;

    while (x + this.c.measureText(word).width > 800) {
      x -= 100;
    }

    let box = new Box(this.c, x, this.spawnY, word);
    let node = new Node(box);
    this.boxes.insert(node);
    this.words.set(word, node);
  }

}

export default Game;