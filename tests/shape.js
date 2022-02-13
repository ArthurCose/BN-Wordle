import test from "ava";
import Shape from "../src/shape.js";

const rotatingShape = new Shape();
rotatingShape.set(0, -1, true);

test("Shapes.existsAt 0°", (t) => {
  t.true(rotatingShape.existsAt(0, -1));
});

test("Shapes.existsAt 90°", (t) => {
  rotatingShape.rotate();
  t.true(rotatingShape.existsAt(1, 0));
});

test("Shapes.existsAt 180°", (t) => {
  rotatingShape.rotate();
  t.true(rotatingShape.existsAt(0, 1));
});

test("Shapes.existsAt 270°", (t) => {
  rotatingShape.rotate();
  t.true(rotatingShape.existsAt(-1, 0));
});

test("Shapes.existsAt 360°", (t) => {
  rotatingShape.rotate();
  t.true(rotatingShape.existsAt(0, -1));
});

test("Shapes.existsAt should not wrap", (t) => {
  // test
  const shape = new Shape();
  shape.blocks = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
  ];
  shape.color = "red";
  shape.letter = "";
  shape.rotation = 0;
  shape.x = 4;
  shape.y = 2;

  t.false(shape.existsAt(0, 4));
});
