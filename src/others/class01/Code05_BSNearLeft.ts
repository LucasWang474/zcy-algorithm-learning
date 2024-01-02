function BinarySearch(arr: number[], target: number): number {
  let L = 0,
    R = arr.length - 1,
    M,
    cur,
    res = -1;
  while (L <= R) {
    M = L + ((R - L) >> 1);
    cur = arr[M];
    if (cur < target) {
      L = M + 1;
    } else if (cur >= target) {
      res = M;
      R = M - 1;
    }
  }
  return res;
}

function bruteForce(arr: number[], target: number): number {
  // 有序数组中找到 >=target 最左的位置，暴力解法
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= target) {
      return i;
    }
  }
  return -1;
}

function randomArr(len = 100, maxNum = 1000000): number[] {
  const L = -Math.abs(maxNum),
    R = Math.abs(maxNum);
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.trunc(Math.random() * (R - L) + L));
  }
  return arr;
}

function test(len = 100, times = 100000, maxNum = 1000000) {
  const label = `Binary Search: len: ${len}, times: ${times}, maxNum: ${maxNum}`;
  console.time(label);
  for (let i = 0; i < times; i++) {
    const arr = randomArr(len, maxNum).sort((a, b) => a - b);
    const target = arr[Math.trunc(Math.random() * arr.length)];
    const expected = bruteForce(arr, target);
    const actual = BinarySearch(arr, target);
    if (expected !== actual) {
      console.assert(false, {
        arr,
        target,
        expected,
        actual,
      });
      return;
    }
  }
  console.timeEnd(label);
}

const len = +process.argv[2] || 10;
const times = +process.argv[3] || 10000;
const maxNum = +process.argv[4] || 100;
test(len, times, maxNum);
