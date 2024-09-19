import { InputEnum } from "../input_manager";
import {
  BLOCK_RENDER_SIDE_LEN,
  GRID_BLOCK_SIDE_LEN,
  GRID_RENDER_SIDE_LEN,
  GRID_RENDER_OFFSET_X,
  GRID_RENDER_OFFSET_Y,
  COLORS,
} from "./shared_constants";

const GRID_BORDER_SIZE = 6;

export default class Grid {
  #hasFocus = false;
  #focusedTime = 0;
  #selectedShape = null;
  #shapes = [];

  cursorPos = {
    x: 2,
    y: 2,
  };

  onExit = () => {};
  onReturnShape = (shape) => {};

  setShapes(shapes) {
    this.#shapes = shapes;
  }

  selectShape(shape) {
    this.#selectedShape = shape;
  }

  #hasSameColorNeighbor(shape, x, y) {
    const hasSameColor = (x, y) => {
      const s = this.getShape(x, y);
      return s && s != shape && s.color == shape.color;
    };

    return (
      hasSameColor(x - 1, y) ||
      hasSameColor(x + 1, y) ||
      hasSameColor(x, y - 1) ||
      hasSameColor(x, y + 1)
    );
  }

  isValid() {
    for (let y = 0; y < GRID_BLOCK_SIDE_LEN; y++) {
      for (let x = 0; x < GRID_BLOCK_SIDE_LEN; x++) {
        const shape = this.getShape(x, y);

        if (!shape) continue;

        if (this.#hasSameColorNeighbor(shape, x, y)) {
          return false;
        }
      }
    }

    return true;
  }

  #grabShape() {
    const shape = this.getShape(this.cursorPos.x, this.cursorPos.y);

    if (!shape) {
      return null;
    }

    const index = this.#shapes.indexOf(shape);
    this.#shapes.splice(index, 1);

    this.#selectedShape = shape;
    this.cursorPos.x = shape.x;
    this.cursorPos.y = shape.y;

    return shape;
  }

  #keepSelectedShapeInBounds() {
    if (!this.#selectedShape) {
      return;
    }

    let moved = false;

    do {
      for (let x = 0; x < GRID_BLOCK_SIDE_LEN; x++) {
        if (this.#selectedShape.existsAt(x, -1)) {
          this.#selectedShape.y += 1;
        }

        if (this.#selectedShape.existsAt(x, GRID_BLOCK_SIDE_LEN)) {
          this.#selectedShape.y -= 1;
        }
      }

      for (let y = 0; y < GRID_BLOCK_SIDE_LEN; y++) {
        if (this.#selectedShape.existsAt(-1, y)) {
          this.#selectedShape.x += 1;
        }

        if (this.#selectedShape.existsAt(GRID_BLOCK_SIDE_LEN, y)) {
          this.#selectedShape.x -= 1;
        }
      }
    } while (moved);

    this.cursorPos.x = this.#selectedShape.x;
    this.cursorPos.y = this.#selectedShape.y;
  }

  #placeSelectedShape() {
    if (!this.#selectedShape) return false;

    for (let x = 0; x < GRID_BLOCK_SIDE_LEN; x++) {
      for (let y = 0; y < GRID_BLOCK_SIDE_LEN; y++) {
        if (!this.#selectedShape.existsAt(x, y)) continue;

        const shape = this.getShape(x, y);

        if (shape) {
          // todo: play sfx on fail?
          return false;
        }
      }
    }

    this.#shapes.push(this.#selectedShape);
    this.#selectedShape = null;
    return true;
  }

  getShape(x, y) {
    return this.#shapes.find((shape) => shape.existsAt(x, y));
  }

  giveFocus() {
    this.#hasFocus = true;
    this.#focusedTime = 0;
  }

  removeFocus() {
    this.#hasFocus = false;
  }

  update(inputManager, delta) {
    this.#focusedTime += delta;

    const left =
      inputManager.justPressed(InputEnum.LEFT) ||
      inputManager.justRepeated(InputEnum.LEFT);
    const right =
      inputManager.justPressed(InputEnum.RIGHT) ||
      inputManager.justRepeated(InputEnum.RIGHT);
    const up =
      inputManager.justPressed(InputEnum.UP) ||
      inputManager.justRepeated(InputEnum.UP);
    const down =
      inputManager.justPressed(InputEnum.DOWN) ||
      inputManager.justRepeated(InputEnum.DOWN);

    if (left) {
      this.cursorPos.x -= 1;
    }
    if (right) {
      this.cursorPos.x += 1;
    }
    if (up) {
      this.cursorPos.y -= 1;
    }
    if (down) {
      this.cursorPos.y += 1;
    }

    if (!this.#selectedShape && this.cursorPos.x >= GRID_BLOCK_SIDE_LEN) {
      this.onExit(this.cursorPos);
    }

    this.cursorPos.x = Math.max(0, this.cursorPos.x);
    this.cursorPos.x = Math.min(GRID_BLOCK_SIDE_LEN - 1, this.cursorPos.x);
    this.cursorPos.y = Math.max(0, this.cursorPos.y);
    this.cursorPos.y = Math.min(GRID_BLOCK_SIDE_LEN - 1, this.cursorPos.y);

    if (this.#selectedShape) {
      this.#selectedShape.x = this.cursorPos.x;
      this.#selectedShape.y = this.cursorPos.y;

      if (inputManager.justPressed(InputEnum.L)) {
        this.#selectedShape.rotateLeft();
      }
      if (inputManager.justPressed(InputEnum.R)) {
        this.#selectedShape.rotate();
      }

      this.#keepSelectedShapeInBounds();

      if (inputManager.justPressed(InputEnum.A)) {
        this.#placeSelectedShape();
      } else if (inputManager.justPressed(InputEnum.B)) {
        const shape = this.#selectedShape;
        this.#selectedShape = null;

        this.#shapes = this.#shapes.filter((s) => s != shape);
        this.onReturnShape(shape);
      }
    } else {
      if (inputManager.justPressed(InputEnum.A)) {
        this.#grabShape();
      } else if (inputManager.justPressed(InputEnum.B)) {
        this.onExit(this.cursorPos);
      }
    }
  }

  render(ctx) {
    // border
    ctx.fillStyle = COLORS.BORDER;
    ctx.fillRect(
      GRID_RENDER_OFFSET_X - GRID_BORDER_SIZE,
      GRID_RENDER_OFFSET_Y - GRID_BORDER_SIZE,
      GRID_RENDER_SIDE_LEN + GRID_BORDER_SIZE * 2,
      GRID_RENDER_SIDE_LEN + GRID_BORDER_SIZE * 2
    );

    // background
    ctx.fillStyle = COLORS.GRID_BACKGROUND;
    ctx.fillRect(
      GRID_RENDER_OFFSET_X,
      GRID_RENDER_OFFSET_Y,
      GRID_RENDER_SIDE_LEN,
      GRID_RENDER_SIDE_LEN
    );

    // blocks
    for (let x = 0; x < GRID_BLOCK_SIDE_LEN; x++) {
      for (let y = 0; y < GRID_BLOCK_SIDE_LEN; y++) {
        const shape = this.getShape(x, y);

        if (shape) {
          ctx.fillStyle = shape.color;
          ctx.fillRect(
            GRID_RENDER_OFFSET_X + BLOCK_RENDER_SIDE_LEN * x,
            GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * y,
            BLOCK_RENDER_SIDE_LEN,
            BLOCK_RENDER_SIDE_LEN
          );
        }

        if (this.#selectedShape && this.#selectedShape.existsAt(x, y)) {
          ctx.globalAlpha = 0.75;
          ctx.fillStyle = this.#selectedShape.color;
          ctx.fillRect(
            GRID_RENDER_OFFSET_X + BLOCK_RENDER_SIDE_LEN * x,
            GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * y,
            BLOCK_RENDER_SIDE_LEN,
            BLOCK_RENDER_SIDE_LEN
          );

          ctx.globalAlpha = 1;
        }
      }
    }

    ctx.fillStyle = COLORS.LINE_SHADOW;
    ctx.beginPath();
    // to the right
    ctx.moveTo(
      GRID_RENDER_OFFSET_X,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 2
    );
    ctx.lineTo(
      GRID_RENDER_OFFSET_X + GRID_RENDER_SIDE_LEN,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 2
    );

    // center
    ctx.lineTo(
      GRID_RENDER_OFFSET_X + GRID_RENDER_SIDE_LEN,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 2.5
    );

    // back to the left
    ctx.lineTo(
      GRID_RENDER_OFFSET_X + GRID_RENDER_SIDE_LEN,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 3
    );
    ctx.lineTo(
      GRID_RENDER_OFFSET_X,
      GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * 3
    );

    // auto closes
    ctx.fill();

    // draw cursor
    if (this.#hasFocus) {
      const { x, y } = this.cursorPos;
      ctx.strokeStyle = COLORS.GRID_CURSOR;

      ctx.strokeRect(
        GRID_RENDER_OFFSET_X + BLOCK_RENDER_SIDE_LEN * x + 0.5,
        GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * y + 0.5,
        BLOCK_RENDER_SIDE_LEN - 1,
        BLOCK_RENDER_SIDE_LEN - 1
      );

      // draw shape letter
      const shape = this.getShape(x, y);

      if (!this.#selectedShape && shape) {
        ctx.fillStyle = COLORS.GRID_CURSOR_LETTER;
        ctx.font = "16px bn6-bold";
        ctx.textBaseline = "top";
        ctx.fillText(
          shape.letter,
          GRID_RENDER_OFFSET_X + BLOCK_RENDER_SIDE_LEN * x + 6,
          GRID_RENDER_OFFSET_Y + BLOCK_RENDER_SIDE_LEN * y + 3
        );
      }
    }
  }
}
