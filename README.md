## Overview

[Live](https://jinhuachen1314.github.io/TypeFast/)
TypeFast is a simple typing game, where users could train on typing speed. 

The game basically will have text boxes containing random words text falling from 
the top. The number of boxes falling is gradually increasing during the game, as 
well as the speed of falling. Users need to clear out the text boxes before the 
boxes hit the groud, and users have to clear them in the order of falling. Each
hit gets 1 point.

![](https://media.giphy.com/media/izbVPk2M0xbQs5Pe98/giphy.gif)

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

Underlying data storage with Customize Linked List class and JS Map 
Increase look up and removal speed
```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

export default Node;
```

```javascript
import Node from './node';

class LinkedList {
  constructor() {
    this.initialize();
  }
  
  initialize() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.curr = null;
  }

  insert(node) {
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
      this.curr = this.head;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.size++;
  }

  remove(node) {
    if (this.size === 0) return;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      this.head = node.next;
    } else if (node === this.tail) {
      this.tail = node.prev;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    this.size--;
  }

  reset() {
    this.curr = this.head;
  }

  hasNext() {
    return this.curr !== null;
  }

  next() {
    let node = this.curr;
    this.curr = node.next;
    return node;
  }
}

export default LinkedList;
```

```javascript
this.boxes = new LinkedList();
this.words = new Map();
```

Enable to recycle the storage
```javascript
this.boxes.initialize();
this.words.clear();
```


Creation of each text box, and listening to
user's input
```javascript
spawnRandomObject() {
  let word = randomWords();
  while (this.words.has(word)) word = randomWords();

  let x = Math.random() * 900;

  while (x + this.c.measureText(word).width > 800) x -= 100;

  let box = new Box(this.c, x, this.spawnY, word);
  let node = new Node(box);
  this.boxes.insert(node);
  this.words.set(word, node);
}

listenToInput() {
  this.input.addEventListener("input", e => {
    let userInput = e.target.value;
    if (this.words.has(userInput)) {
      console.log(userInput);
      let node = this.words.get(userInput);

      this.boxes.remove(node);
      this.words.delete(userInput);

      e.target.value = "";
      this.currentScore++;
      this.score.innerHTML = `<span>Score: ${this.currentScore} </span>`;

      if (this.currentScore > this.highestScore) {
        this.highest.innerHTML = `<span>Highest: ${this.currentScore} </span>`;
        this.highestScore = this.currentScore;
      }
    }
  })
}
```

Monitor speed, and increase the speed, time to spawn word
```javascript
const currentTime = Date.now();
    
if (currentTime - this.startTime > 30000) {
  this.spawnRateOfDescent *= 1.5;
  this.spawnRate *= 0.8;
  this.startTime = currentTime;
}
  
if (currentTime - this.lastSpawn > this.spawnRate) {
  this.lastSpawn = currentTime;
  this.spawnRandomObject();
}
```

avoid promise error of the music, load the music, and play when user starts
```javascript
initializeGame() {
  this.audio.load();
}

playGame() {
  this.audio.play();
}
```

Remember user's highest record using browser's local storage
```javascript
// GET USER'S HIGHEST RECORD
const value = localStorage.getItem("score");

let highest = 0;
if (value !== null) highest = parseInt(value);

highestscore.innerHTML = `<span>HIGHEST: ${highest} </span>`;

// UPDATE RECORD
localStorage.setItem("score", this.highestScore);
```
