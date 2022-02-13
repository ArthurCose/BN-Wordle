import test from "ava";
import WORDS from "../src/words.js";

test("all words have exactly 5 letters", (t) => {
  const failedWords = WORDS.filter((word) => word.length != 5);

  t.deepEqual(failedWords, []);
});

test("words have no duplicates", (t) => {
  const failedWords = WORDS.filter((word, i) => i != WORDS.lastIndexOf(word));

  t.deepEqual(failedWords, []);
});
