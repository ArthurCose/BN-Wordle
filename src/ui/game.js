import Grid from "./grid";
import Inventory from "./inventory";
import RunLine from "./run_line";
import Buttons from "./buttons";
import { GRID_BLOCK_SIDE_LEN, GAME_HEIGHT, COLORS } from "./shared_constants";
import { InputManager } from "../input_manager";
import { randomItem } from "../random";
import { generateWordShapes } from "../generation";
import WORDS from "../words";
import arrayShuffle from "array-shuffle";

export default class Game {
  #inventory = new Inventory();
  #grid = new Grid();
  #runLine = new RunLine(this.#grid);
  #buttons;
  #focusedUI = this.#inventory;
  #inputManager = new InputManager();

  constructor(canvas) {
    this.#buttons = new Buttons(canvas, this.#inputManager);

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
    this.#buttons.update();
  }

  #isLandscape() {
    if (window.innerHeight < window.innerWidth) {
      return true;
    } else {
      return false;
    }
  }

  render(canvas, ctx) {
    if (this.#isLandscape()) {
      canvas.height = GAME_HEIGHT;
    } else {
      canvas.height = GAME_HEIGHT * 2;
      this.#buttons.render(ctx);
    }

    ctx.fillStyle = COLORS.BOARD;
    ctx.fillRect(0, 0, canvas.width, GAME_HEIGHT);

    this.#grid.render(ctx);
    this.#inventory.render(ctx);
    this.#runLine.render(ctx);
  }
}
