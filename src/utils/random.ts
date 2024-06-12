export function getRandomArrays(size = 100) {
  const res = new Array(size);
  for (let i = 0; i < res.length; i++) {
    res[i] = Math.trunc(Math.random() * 100);
  }
  return res;
}

export function getRandomInteger(maxNum = 100) {
  return Math.trunc(Math.random() * maxNum);
}
