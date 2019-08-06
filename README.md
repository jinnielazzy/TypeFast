## Overview

[Live](https://jinhuachen1314.github.io/TypeFast/)
TypeFast is a simple typing game, where users could train on typing speed. 

The game basically will have text boxes containing random words text falling from 
the top. The number of boxes falling is gradually increasing during the game, as 
well as the speed of falling. Users need to clear out the text boxes before the 
boxes hit the groud, and users have to clear them in the order of falling. Each
hit gets 1 point.

![](https://media.giphy.com/media/KzcINd1me3tcfRSQqM/giphy.gif)

Text box class
```javascript
class Box {
  constructor(c, x, y, text) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.text = text;
  }
}

export default Box;
```
Generate random words using existing library
```json
"dependencies": {
  "random-words": "^1.1.0"
}
```
```javascript
const randomWords = require('random-words');
```

Creation of each text box, and listening to
user's input
```javascript
spawnRandomObject() {
  const word = randomWords();
  let x = Math.random() * (this.c.canvas.width);

  while (x + this.c.measureText(word).width > this.c.canvas.width) {
    x -= 100;
  }

  const box = new Box(this.c, x, this.spawnY, word);
  this.words.push(word);
  this.boxes.push(box);
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
  })
}
```

Monitor speed, and increase the speed
```javascript
const time = Date.now();   

if (time - this.startTime > 60000) {
  this.spawnRateOfDescent += 0.5;
  this.startTime = time;
}

if (time > (this.lastSpawn + this.spawnRate)) {
  this.lastSpawn = time;
  this.spawnRandomObject();
}
```

avoid promise error of the music, load the music, and play when user starts
```javascript
initializeGame() {
  // other initializions here
  this.audio.load();
}

playGame() {
  this.audio.play();
}
```

While firing score animation, 
applying mutation observer over mutation events to avoid overly fired, crashy, and slowness
```javascript
const callback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const target = mutation.target;

      target.classList.add('glow');
      setTimeout(function () {
        target.classList.remove('glow')
      }, 500);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(score, config);
```
