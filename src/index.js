import Game from "./ui/game";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game = new Game();

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
});
