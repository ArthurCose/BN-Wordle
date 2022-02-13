const MAX_SHAPE_SIDE_LEN = 5;
const CENTER_LEN = Math.floor(MAX_SHAPE_SIDE_LEN / 2);

export default class Shape {
  #blocks = [];

  constructor() {
    this.color = "";
    this.letter = "";
    this.x = 0;
    this.y = 0;
    this.rotation = 0;

    for (let i = 0; i < MAX_SHAPE_SIDE_LEN * MAX_SHAPE_SIDE_LEN; i++) {
      this.#blocks[i] = false;
    }
  }

  isColumn() {
    let count = 0;

    for (let i = 0; i < MAX_SHAPE_SIDE_LEN; i++) {
      for (let j = 0; j < MAX_SHAPE_SIDE_LEN; j++) {
        const index = i * MAX_SHAPE_SIDE_LEN + j;

        if (!this.#blocks[index]) continue;

        if (j != CENTER_LEN) {
          // found a block outside of a column
          return false;
        }

        count++;
      }
    }

    // 1x1 is not a column
    return count > 1;
  }

  rotate() {
    this.rotation += 1;
    this.rotation %= 4;
  }

  rotateLeft() {
    this.rotation -= 1;

    if (this.rotation < 0) {
      this.rotation = 3;
    }
  }

  canSet(x, y) {
    const index = this.getIndex(x, y);
    return index >= 0 && index < MAX_SHAPE_SIDE_LEN * MAX_SHAPE_SIDE_LEN;
  }

  set(x, y, value) {
    const index = this.getIndex(x, y);
    this.#blocks[index] = value;
  }

  existsAt(x, y) {
    const index = this.getIndex(x, y);
    return this.#blocks[index] == true;
  }

  countBlocks() {
    let count = 0;

    for (let i = 0; i < this.#blocks.length; i++) {
      if (this.#blocks[i]) {
        count++;
      }
    }

    return count;
  }

  recalculateCenter() {
    const bounds = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };

    const validPositions = [];

    for (let i = 0; i < MAX_SHAPE_SIDE_LEN; i++) {
      for (let j = 0; j < MAX_SHAPE_SIDE_LEN; j++) {
        const index = i * MAX_SHAPE_SIDE_LEN + j;

        if (!this.#blocks[index]) continue;

        const x = j - CENTER_LEN;
        const y = i - CENTER_LEN;

        if (x < bounds.left) {
          bounds.left = x;
        }
        if (y < bounds.top) {
          bounds.top = y;
        }
        if (x > bounds.right) {
          bounds.right = x;
        }
        if (y > bounds.bottom) {
          bounds.bottom = y;
        }

        validPositions.push({ x, y });
      }
    }

    const trueCenter = {
      x: (bounds.left + bounds.right) / 2,
      y: (bounds.bottom + bounds.top) / 2,
    };

    validPositions.sort((posA, posB) => {
      const manhattanDistA =
        Math.abs(trueCenter.x - posA.x) + Math.abs(trueCenter.y - posA.y);
      const manhattanDistB =
        Math.abs(trueCenter.x - posB.x) + Math.abs(trueCenter.y - posB.y);

      return manhattanDistA < manhattanDistB ? -1 : 1;
    });

    const newCenter = validPositions[0];
    this.x -= newCenter.x;
    this.y -= newCenter.y;

    const updatedBlocks = [...this.#blocks];

    for (let i = 0; i < MAX_SHAPE_SIDE_LEN; i++) {
      for (let j = 0; j < MAX_SHAPE_SIDE_LEN; j++) {
        let value = false;

        const oldX = j + newCenter.x;
        const oldY = i + newCenter.y;

        if (
          oldX >= 0 &&
          oldY >= 0 &&
          oldX < MAX_SHAPE_SIDE_LEN &&
          oldY < MAX_SHAPE_SIDE_LEN
        ) {
          const index = oldY * MAX_SHAPE_SIDE_LEN + oldX;
          value = this.#blocks[index];
        }

        const index = i * MAX_SHAPE_SIDE_LEN + j;
        updatedBlocks[index] = value;
      }
    }

    this.#blocks = updatedBlocks;
  }

  getIndex(x, y) {
    x = x - this.x;
    y = y - this.y;
    let transformedX, transformedY;

    switch (this.rotation) {
      case 0:
        // [x-y-, x+y-]
        // [x-y+, x+y+]
        transformedX = x;
        transformedY = y;
        break;
      case 1:
        // 90 clockwise
        // [x-y+, x-y-]
        // [x+y+, x+y-]
        transformedX = y;
        transformedY = CENTER_LEN - x - 2;
        break;
      case 2:
        // 180
        // [x+y+, x-y+]
        // [x+y-, x-y-]
        transformedX = CENTER_LEN - x - 2;
        transformedY = CENTER_LEN - y - 2;
        break;
      case 3:
        // 270
        // [x+y-, x+y+]
        // [x-y-, x-y+]
        transformedX = CENTER_LEN - y - 2;
        transformedY = x;
        break;
    }

    transformedX += CENTER_LEN;
    transformedY += CENTER_LEN;

    if (
      transformedX < 0 ||
      transformedY < 0 ||
      transformedX >= MAX_SHAPE_SIDE_LEN ||
      transformedY >= MAX_SHAPE_SIDE_LEN
    ) {
      return -1;
    }

    return transformedY * MAX_SHAPE_SIDE_LEN + transformedX;
  }
}
