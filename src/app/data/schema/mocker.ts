export function randomString(): string {
  return Math.random().toString(36).substring(2, 15);
}

const RANGE = (x, y) => Array.from((function*() {
  while (x <= y) { yield x++; }
})());










