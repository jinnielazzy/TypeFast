import Box from "./box";

class Game {
  constructor(c) {
    // initialize board, boxes, speed, music
    this.c = c;
    this.score = document.getElementsByClassName("score");
    this.audio = document.getElementById("audio");
    this.music = document.getElementById("music");
    this.input = document.getElementById("input");

    // when game starts
    this.spawnY = 25;
    this.spawnRate = 1500;
    this.spawnRateOfDescent = 0.50;
    this.lastSpawn = -1;
    this.boxes = [];
    this.startTime = Date.now();
    this.audio.load();
    this.animate = this.animate.bind(this);
    this.spawnRandomObject = this.spawnRandomObject.bind(this);
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
    this.input.addEventListener("input", e => {
      // console.log(e.target.value);
      if (e.target.value === this.boxes[0].text) {
        // console.log("cancel");
        this.boxes.shift();
        e.target.value = "";
      }
    })

    const time = Date.now();
  
    if (time > (this.lastSpawn + this.spawnRate)) {
      this.lastSpawn = time;
      this.spawnRandomObject();
    }
    
    requestAnimationFrame(this.animate);
    
    this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);
    
    this.c.beginPath();
    this.c.moveTo(0, this.spawnY);
    this.c.lineTo(this.c.canvas.width, this.spawnY);
    this.c.stroke();

    for (let i = 0; i < this.boxes.length; i++) {
      const box = this.boxes[i];
      box.y += this.spawnRateOfDescent;
      this.c.beginPath();
      // this.c.fillRect(box.x, box.y, 100, 30);
      this.c.fillStyle = "#000000";
      this.c.fillText(box.text, box.x + 5, box.y + 1);
      this.c.font = "30px Verdana"
      this.c.closePath();
      // this.c.fill();
    }
  }

  randomString() {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const length = Math.floor(Math.random() * 10);
    const wordLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * wordLength));
    }
    return result;
  }


  spawnRandomObject() {
    const box = new Box(this.c, 
      Math.random() * (this.c.canvas.width - 30),
      this.spawnY,
      this.randomString());

    this.boxes.push(box);
  }

}

export default Game;