function getMax(arr: number[], L?: number, R?: number): number {
  if (L === undefined || R === undefined) {
    return getMax(arr, 0, arr.length - 1);
  }

  if (L === R) return arr[L];

  const M = L + ((R - L) >> 1);
  return Math.max(getMax(arr, L, M), getMax(arr, M + 1, R));
}

function bf(arr: number[]): number {
  return arr.slice().sort((a, b) => b - a)[0];
}

function getRandomArr() {
  const len = ~~(Math.random() * 20) + 1;
  const res = [];
  for (let i = 0; i < len; i++) {
    res.push(~~(Math.random() * 100 - Math.random() * 100));
  }
  return res;
}

function test(times = 100) {
  console.time();
  for (let i = 0; i < times; i++) {
    const input = getRandomArr();
    const expected = bf(input);
    const actual = getMax(input);
    if (expected !== actual) {
      console.assert(false, {
        input: input.sort((a, b) => b - a),
        expected,
        actual,
      });
      return;
    }
  }
  console.timeEnd();
}

test(+process.argv[2] || 100);
