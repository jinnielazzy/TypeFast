import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext('2d');
 
  // const game = new Game(c);
  
  const startBtn = document.getElementById("start-btn");
  const startHeader = document.getElementById("start-header");
  const difficulty = document.getElementById("dropdown");
  const list = document.getElementById("list");

  difficulty.style.display = "none";
  
  startBtn.addEventListener("click", () => {
    startHeader.style.display = "none";
    difficulty.style.display = "flex";
  })

  list.addEventListener("click", (e) => {
    console.log(e.target.innerText);
    difficulty.style.display = "none";
    
  })




});