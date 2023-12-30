function getLocalMin(arr: number[]): number {
  let L = 0, R = arr.length - 1, M, leftVal, rightVal, cur;
  while (L <= R) {
    M = L + ((R - L) >> 1);
    cur = arr[M];
    leftVal = arr[M - 1] || cur + 1;
    rightVal = arr[M + 1] || cur + 1;
    if (cur < leftVal && cur < rightVal) {
      return cur;
    } else if (cur > rightVal) {
      L = M + 1;
    } else {
      R = M - 1;
    }
  }
  throw new Error('Invalid input: ' + arrToString(arr));
}

function getAllLocalMinSet(arr: number[]): Set<number> {
  const set = new Set<number>();
  let left, right;
  for (let i = 0; i < arr.length; i++) {
    left = arr[i - 1] || arr[i] + 1;
    right = arr[i + 1] || arr[i] + 1;
    if (arr[i] <= left && arr[i] <= right) {
      set.add(arr[i]);
    }
  }
  return set;
}

function arrToString(arr: any[]) {
  return `[${arr.join(', ')}]`;
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
    const arr = randomArr(len, maxNum);
    const allLocalMinSet = getAllLocalMinSet(arr);
    const actual = getLocalMin(arr);
    if (!allLocalMinSet.has(actual)) {
      console.assert(false, {
        arr,
        allLocalMinSet,
        actual,
      });
      return;
    }
  }
  console.timeEnd(label);
}

const len = +process.argv[2] || 10;
const times = +process.argv[3] || 10000;
const maxNum = +process.argv[4] || 10;
test(len, times, maxNum);
