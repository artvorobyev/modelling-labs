export function getRandomInt(min: number, max: number) {
  const nMin = Math.ceil(min);
  const nMax = Math.floor(max);
  return Math.floor(Math.random() * (nMax - nMin)) + nMin;
}
