class Game {
  constructor(c) {
    // initialize board, boxes, speed, music
    this.c = c;
    this.score = document.getElementsByClassName("score");
    this.audio = document.getElementById("audio");
    this.music = document.getElementById("music");
    this.input = document.getElementById("input");
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
  }
}

export default Game;