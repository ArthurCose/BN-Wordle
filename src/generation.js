import Shape from "./shape";
import { randomInt, randomItem } from "./random";

const GRID_SIDE_LEN = 5;
let COLORS = ["#DE1100", "#D688C0", "#2880D9", "#19C000", "#D8DA00", "#D8D8D8"];
const MAX_SHAPE_SIZE = 4;
const MAX_COLORS = 4;

function generateColors() {
  const colors = [];

  while (colors.length < MAX_COLORS) {
    const color = randomItem(COLORS);

    if (!colors.includes(color)) {
      colors.push(color);
    }
  }

  return colors;
}

function internalGenerateWordShapes(word) {
  let shapes = [];
  let nextRun = [];
  let colors = generateColors();
  let colorOffset = randomInt(colors.length);

  for (let i = 0; i < GRID_SIDE_LEN; i++) {
    const shape = new Shape();
    shape.color = colors[(i + colorOffset) % colors.length];
    shape.x = i;
    shape.y = 2;
    shape.letter = word[i];

    shape.set(shape.x, shape.y, true);
    shapes.push(shape);

    nextRun.push({
      shape,
      x: shape.x,
      y: shape.y - 1,
    });

    nextRun.push({
      shape,
      x: shape.x,
      y: shape.y + 1,
    });

    if (word[i] == word[i + 1]) {
      // merge repeated letter
      shape.set(shape.x + 1, shape.y, true);
      i++;

      nextRun.push({
        shape,
        x: shape.x + 1,
        y: shape.y - 1,
      });

      nextRun.push({
        shape,
        x: shape.x + 1,
        y: shape.y + 1,
      });
    }
  }

  const spread = ({ shape, x, y }) => {
    nextRun.push({
      shape: shape,
      x: x - 1,
      y: y,
    });

    nextRun.push({
      shape: shape,
      x: x + 1,
      y: y,
    });

    nextRun.push({
      shape: shape,
      x: x,
      y: y - 1,
    });

    nextRun.push({
      shape: shape,
      x: x,
      y: y + 1,
    });
  };

  function hasSameColorNeighbor(shape, x, y) {
    function hasSameColor(x, y) {
      const s = shapes.find((shape) => shape.existsAt(x, y));
      return s && s != shape && s.color == shape.color;
    }

    return (
      hasSameColor(x - 1, y) ||
      hasSameColor(x + 1, y) ||
      hasSameColor(x, y - 1) ||
      hasSameColor(x, y + 1)
    );
  }

  while (nextRun.length > 0) {
    const run = nextRun;
    nextRun = [];

    for (const { shape, x, y } of run) {
      if (x < 0 || y < 0 || x >= GRID_SIDE_LEN || y >= GRID_SIDE_LEN) {
        continue;
      }

      const otherShape = shapes.find((shape) => shape.existsAt(x, y));

      if (otherShape) continue;

      const growShape = () => {
        // spread if we can, or drop this search

        if (hasSameColorNeighbor(shape, x, y)) {
          return;
        }

        if (shape.countBlocks() >= MAX_SHAPE_SIZE || !shape.canSet(x, y)) {
          return;
        }

        shape.set(x, y, true);
        spread({ shape, x, y });
      };

      const tryLater = () => {
        // do nothing, but try again next run
        nextRun.push({ shape, x, y });
      };

      const options = [growShape, tryLater];

      randomItem(options)();
    }
  }

  return shapes;
}

export function generateWordShapes(word) {
  let shapes;

  do {
    shapes = internalGenerateWordShapes(word);
  } while (shapes.filter((shape) => shape.isColumn()).length > 1);

  for (const shape of shapes) {
    shape.recalculateCenter();
  }

  return shapes;
}

export function generateFillerShapes(word) {
  let shapes;

  do {
    shapes = internalGenerateWordShapes(word);
  } while (shapes.filter((shape) => shape.isColumn()).length > 1);

  return shapes;
}
