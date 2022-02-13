import Grid from "./grid";
import Inventory from "./inventory";
import RunLine from "./run_line";
import { GRID_BLOCK_SIDE_LEN } from "./shared_constants";
import { InputManager } from "../input_manager";
import { randomItem } from "../random";
import { generateWordShapes } from "../generation";
import WORDS from "../words";
import arrayShuffle from "array-shuffle";

export default class Game {
  #inventory = new Inventory();
  #grid = new Grid();
  #inputManager = new InputManager();
  #runLine = new RunLine(this.#grid);
  #focusedUI = this.#inventory;

  constructor() {
    const word = randomItem(WORDS);

    this.#runLine.setWord(word);

    this.#inventory.setShapes(arrayShuffle(generateWordShapes(word)));
    this.focusOn(this.#inventory);

    this.#inventory.onRun = () => {
      this.focusOn(this.#runLine);
    };

    this.#inventory.onSelection = (shape) => {
      this.#grid.cursorPos = {
        x: Math.floor(GRID_BLOCK_SIDE_LEN / 2),
        y: Math.floor(GRID_BLOCK_SIDE_LEN / 2),
      };
      this.#grid.selectShape(shape);
      this.focusOn(this.#grid);
    };

    this.#inventory.onExit = (index) => {
      this.#grid.cursorPos = {
        x: GRID_BLOCK_SIDE_LEN - 1,
        y: index,
      };
      this.focusOn(this.#grid);
    };

    this.#grid.onReturnShape = (shape) => {
      this.#inventory.addShape(shape);
    };

    this.#grid.onExit = (cursorPos) => {
      this.#inventory.cursorIndex = cursorPos.y;
      this.focusOn(this.#inventory);
    };

    this.#runLine.onExit = () => {
      this.focusOn(this.#inventory);
    };
  }

  focusOn(ui) {
    this.#focusedUI?.removeFocus();
    this.#focusedUI = ui;

    this.#inputManager.flush();
    ui.giveFocus();
    this.update(0);
  }

  update(delta) {
    this.#focusedUI.update(this.#inputManager, delta);
    this.#inputManager.flush();
  }

  render(canvas, ctx) {
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.#grid.render(ctx);
    this.#inventory.render(ctx);
    this.#runLine.render(ctx);
  }
}
