import {
  INVENTORY_OFFSET_X,
  INVENTORY_OFFSET_Y,
  BLOCK_RENDER_SIDE_LEN,
  GRID_BLOCK_SIDE_LEN,
  BORDER_COLOR,
  GRID_BACKGROUND_COLOR,
} from "./shared_constants";
import { InputEnum } from "../input_manager";
import { randomInt } from "../random";

export default class Inventory {
  #hasFocus = false;
  #focusTime = 0;
  #shapes = [];

  cursorIndex = 0;
  onRun = () => {};
  onExit = (gridPos) => {};
  onSelection = (shape) => {};

  giveFocus() {
    this.#hasFocus = true;
    this.#focusTime = 0;
  }

  removeFocus() {
    this.#hasFocus = false;
    this.#focusTime = 0;
  }

  setShapes(shapes) {
    shapes.forEach((shape) => {
      shape.x = Math.floor(GRID_BLOCK_SIDE_LEN / 2);
      shape.y = Math.floor(GRID_BLOCK_SIDE_LEN / 2);
      shape.rotation = randomInt(4);
    });

    this.#shapes = shapes;
  }

  addShape(shape) {
    shape.x = Math.floor(GRID_BLOCK_SIDE_LEN / 2);
    shape.y = Math.floor(GRID_BLOCK_SIDE_LEN / 2);
    this.#shapes.push(shape);
  }

  update(inputManager, delta) {
    this.#focusTime += delta;

    if (inputManager.justPressed(InputEnum.LEFT)) {
      this.onExit(this.cursorIndex);
      return;
    }

    const pressedUp =
      inputManager.justPressed(InputEnum.UP) ||
      inputManager.justRepeated(InputEnum.UP);

    const pressedDown =
      inputManager.justPressed(InputEnum.DOWN) ||
      inputManager.justRepeated(InputEnum.DOWN);

    if (pressedUp) {
      this.cursorIndex -= 1;
    }
    if (pressedDown) {
      this.cursorIndex += 1;
    }

    this.cursorIndex = Math.max(0, this.cursorIndex);
    this.cursorIndex = Math.min(this.#shapes.length, this.cursorIndex);

    if (inputManager.justPressed(InputEnum.A)) {
      if (this.cursorIndex < this.#shapes.length) {
        const [removedShape] = this.#shapes.splice(this.cursorIndex, 1);
        this.onSelection(removedShape);
      } else {
        this.onRun();
      }
    }
  }

  render(ctx) {
    ctx.font = "16px bn6-bold";
    ctx.textBaseline = "top";
    const width = 26;
    const height = 15;

    for (let i = 0; i < this.#shapes.length; i++) {
      const shape = this.#shapes[i];

      const startX = INVENTORY_OFFSET_X;
      const startY = INVENTORY_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * i;

      // render border
      ctx.fillStyle = BORDER_COLOR;
      ctx.fillRect(startX - 2, startY - 2, width + 4, height + 4);

      // render bg
      ctx.fillStyle = GRID_BACKGROUND_COLOR;
      ctx.fillRect(startX, startY, width, height);

      // render mini shape
      ctx.fillStyle = shape.color;
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          if (!shape.existsAt(x, y)) continue;

          ctx.fillRect(startX + x * 3 + 11, startY + y * 3, 3, 3);
        }
      }

      ctx.fillStyle = "white";
      ctx.fillText(shape.letter, startX + 1, startY + 1);
    }

    // render run button
    {
      const startX = INVENTORY_OFFSET_X;
      const startY =
        INVENTORY_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * this.#shapes.length;

      // render border
      ctx.fillStyle = BORDER_COLOR;
      ctx.fillRect(startX - 2, startY - 2, width + 4, height + 4);

      // render bg
      ctx.fillStyle = "lime";
      ctx.fillRect(startX, startY, width, height);

      ctx.fillStyle = "white";
      ctx.fillText("RUN", startX + 1, startY + 1);
    }

    if (this.#hasFocus) {
      const startX = INVENTORY_OFFSET_X - 9 + Math.sin(this.#focusTime * 16);
      const startY =
        INVENTORY_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * this.cursorIndex;

      ctx.strokeStyle = "green";
      ctx.fillStyle = "lime";
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + 8, startY + height / 2);
      ctx.lineTo(startX, startY + height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
}
