import { InputEnum } from "../input_manager";
import {
  BLOCK_RENDER_SIDE_LEN,
  GRID_RENDER_SIDE_LEN,
  GRID_RENDER_OFFSET_X,
  GRID_RENDER_OFFSET_Y,
  GRID_BLOCK_SIDE_LEN,
  GRID_BLOCK_CENTER,
} from "./shared_constants";

export default class RunLine {
  #progress = 0;
  #grid;
  #word;
  #builtWord;
  #validGrid;

  constructor(grid, word) {
    this.#grid = grid;
  }

  onSuccess = () => {};
  onExit = () => {};

  setWord(word) {
    this.#word = word;
  }

  giveFocus() {
    this.#progress = 0;
    this.#builtWord = null;
  }

  removeFocus() {
    this.#progress = 0;
  }

  #reviewGrid() {
    this.#builtWord = "";

    for (let i = 0; i < GRID_BLOCK_SIDE_LEN; i++) {
      const shape = this.#grid.getShape(i, GRID_BLOCK_CENTER);

      this.#builtWord += shape ? shape.letter : "?";
    }

    this.#validGrid = this.#grid.isValid();
  }

  update(inputManager, delta) {
    this.#progress = Math.min(1, this.#progress + delta / 2);

    const accept = inputManager.justPressed(InputEnum.A);
    const cancel = inputManager.justPressed(InputEnum.B);

    if ((accept || cancel) && this.#progress == 1) {
      this.onExit();
    }

    if (!this.#builtWord && this.#progress == 1) {
      this.#reviewGrid();
    }
  }

  #renderLine(ctx) {
    ctx.beginPath();

    const progressWidth = GRID_RENDER_SIDE_LEN * this.#progress;

    // to the right
    ctx.moveTo(
      GRID_RENDER_OFFSET_X,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 2
    );
    ctx.lineTo(
      GRID_RENDER_OFFSET_X + progressWidth,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 2
    );

    // center
    ctx.lineTo(
      GRID_RENDER_OFFSET_X + progressWidth,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 2.5
    );

    // back to the left
    ctx.lineTo(
      GRID_RENDER_OFFSET_X + progressWidth,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 3
    );
    ctx.lineTo(
      GRID_RENDER_OFFSET_X,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 3
    );

    ctx.fill();
  }

  #renderText(ctx, offsetX, offsetY) {
    for (let i = 0; i < GRID_BLOCK_SIDE_LEN * this.#progress - 0.5; i++) {
      const shape = this.#grid.getShape(i, GRID_BLOCK_CENTER);

      ctx.font = "16px bn6-bold";
      ctx.fillText(
        shape ? shape.letter : "?",
        GRID_RENDER_OFFSET_X + BLOCK_RENDER_SIDE_LEN * i + 6 + offsetX,
        GRID_RENDER_OFFSET_Y +
          BLOCK_RENDER_SIDE_LEN * GRID_BLOCK_CENTER +
          3 +
          offsetY
      );
    }
  }

  render(ctx) {
    ctx.fillStyle = "#ffff0066";

    this.#renderLine(ctx);

    // text shadow
    this.#renderText(ctx, 1, 1);

    if (this.#progress < 1) {
      ctx.fillStyle = "black";
    } else if (this.#builtWord == this.#word) {
      ctx.fillStyle = this.#validGrid ? "lime" : "orange";
    } else {
      ctx.fillStyle = "red";
    }

    this.#renderText(ctx, 0, 0);
  }
}
