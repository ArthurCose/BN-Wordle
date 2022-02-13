export const InputEnum = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
  A: 4,
  B: 5,
  START: 6,
  L: 7,
  R: 8,
};

const KeyboardBinding = {
  ArrowUp: InputEnum.UP,
  ArrowDown: InputEnum.DOWN,
  ArrowLeft: InputEnum.LEFT,
  ArrowRight: InputEnum.RIGHT,
  KeyZ: InputEnum.A,
  KeyX: InputEnum.B,
  Enter: InputEnum.START,
  KeyA: InputEnum.L,
  KeyS: InputEnum.R,
};

export class InputManager {
  #pressed = [];
  #repeated = [];
  #held = [];
  #released = [];

  constructor() {
    document.addEventListener("keydown", (e) => {
      const input = KeyboardBinding[e.code];

      if (input != undefined) {
        if (this.#held[input]) {
          this.#repeated[input] = true;
        } else {
          this.#pressed[input] = true;
          this.#held[input] = true;
        }
      }
    });

    document.addEventListener("keyup", (e) => {
      const input = KeyboardBinding[e.code];

      if (input != undefined) {
        this.#released[input] = true;
        this.#held[input] = false;
      }
    });
  }

  justPressed(input) {
    return this.#pressed[input] == true;
  }

  justRepeated(input) {
    return this.#repeated[input] == true;
  }

  justReleased(input) {
    return this.#released[input] == true;
  }

  isDown(input) {
    return this.#held[input] == true;
  }

  flush() {
    this.#pressed = [];
    this.#released = [];
    this.#repeated = [];
  }
}
