function BubbleSort(arr: number[]): number[] {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

function swap(arr: number[], i: number, j: number) {
  let temp;
  temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function randomArr(len = 100, L = -1000, R = 1000): number[] {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.trunc(Math.random() * (R - L) + L));
  }
  return arr;
}

function arrEquals(arr1: any[], arr2: any[]): boolean {
  if (arr1?.length !== arr2?.length) return false;
  for (let i = 0; i < arr1?.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function test(times = 1000, len = 100) {
  const label = `BubbleSort: times: ${times}, len: ${len}`;
  console.time(label);
  for (let i = 0; i < times; i++) {
    const input = randomArr(len);
    const expected = input.slice().sort((a, b) => a - b);
    const actual = BubbleSort(input.slice());
    if (!arrEquals(expected, actual)) {
      console.assert(false, {
        input,
        expected,
        actual,
      });
      return;
    }
  }
  console.timeEnd(label);
}

const times = +process.argv[2] || 1000;
const len = +process.argv[3] || 100;
test(times, len);
