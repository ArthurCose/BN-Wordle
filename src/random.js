// [0, n)
export function randomInt(n) {
  return Math.floor(Math.random() * n);
}

export function randomItem(array) {
  return array[randomInt(array.length)];
}
