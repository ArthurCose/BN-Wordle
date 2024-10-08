import Game from "./ui/game";
import words from "./words";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game = new Game(canvas);

let previousTime;

function gameLoop(time) {
  if (previousTime == undefined) {
    previousTime = time;
    requestAnimationFrame(gameLoop);
    return;
  }

  const delta = (time - previousTime) / 1000;
  previousTime = time;

  game.update(delta);
  game.render(canvas, ctx);

  requestAnimationFrame(gameLoop);
}

window.addEventListener("load", function () {
  gameLoop(0);

  const sortedList = [...words];
  sortedList.sort();

  document.getElementById("word-list").innerText = sortedList.join("\n");
});
