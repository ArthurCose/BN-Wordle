import { GAME_WIDTH, GAME_HEIGHT } from "./shared_constants";
import { InputEnum } from "../input_manager";

const BUTTON_SIZE = 24;

export default class Buttons {
  #buttons = [
    {
      binding: InputEnum.L,
      x: 0,
      y: 1,
      w: 2,
      h: 1,
    },
    {
      binding: InputEnum.R,
      x: GAME_WIDTH / BUTTON_SIZE - 2,
      y: 1,
      w: 2,
      h: 1,
    },
    {
      binding: InputEnum.LEFT,
      x: 1,
      y: 4,
      w: 1,
      h: 1,
    },
    {
      binding: InputEnum.RIGHT,
      x: 3,
      y: 4,
      w: 1,
      h: 1,
    },
    {
      binding: InputEnum.UP,
      x: 2,
      y: 3,
      w: 1,
      h: 1,
    },
    {
      binding: InputEnum.DOWN,
      x: 2,
      y: 5,
      w: 1,
      h: 1,
    },
    {
      binding: InputEnum.A,
      x: GAME_WIDTH / BUTTON_SIZE - 3,
      y: 3,
      w: 1,
      h: 1,
    },
    {
      binding: InputEnum.B,
      x: GAME_WIDTH / BUTTON_SIZE - 4,
      y: 4,
      w: 1,
      h: 1,
    },
  ];
  #canvas;
  #state = [];
  #inputManager;

  constructor(canvas, inputManager) {
    this.#canvas = canvas;
    this.#inputManager = inputManager;

    canvas.addEventListener("touchstart", (e) => {
      this.#updateFromTouchEvent(e);
    });

    canvas.addEventListener("touchmove", (e) => {
      this.#updateFromTouchEvent(e);
    });

    canvas.addEventListener("touchend", (e) => {
      this.#updateFromTouchEvent(e);
    });
  }

  #updateFromTouchEvent(event) {
    const canvas = this.#canvas;
    const canvasRect = canvas.getBoundingClientRect();

    const newState = [];

    for (const touch of event.targetTouches) {
      // get corrected canvas position
      let x =
        ((touch.clientX - canvasRect.x) / canvasRect.width) * canvas.width;
      let y =
        ((touch.clientY - canvasRect.y) / canvasRect.height) * canvas.height;

      // transform position to button space
      x = x / BUTTON_SIZE;
      y = (y - GAME_HEIGHT) / BUTTON_SIZE;

      for (const button of this.#buttons) {
        if (
          x > button.x &&
          y > button.y &&
          x < button.x + button.w &&
          y < button.y + button.h
        ) {
          newState[button.binding] = true;
        }
      }
    }

    for (let i = 0; i < InputEnum.SIZE; i++) {
      if (this.#state[i] && !newState[i]) {
        this.#inputManager.simulateRelease(i);
      } else if (!this.#state[i] && newState[i]) {
        this.#inputManager.simulatePress(i);
      }
    }

    this.#state = newState;
  }

  update() {
    for (let i = 0; i < InputEnum.SIZE; i++) {
      if (this.#state[i]) {
        this.#inputManager.simulatePress(i);
      }
    }
  }

  render(ctx) {
    ctx.fillStyle = "white";

    for (const button of this.#buttons) {
      ctx.fillRect(
        button.x * BUTTON_SIZE,
        GAME_HEIGHT + button.y * BUTTON_SIZE,
        button.w * BUTTON_SIZE,
        button.h * BUTTON_SIZE
      );
    }
  }
}
