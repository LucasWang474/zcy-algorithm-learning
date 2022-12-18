function InsertionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
      swap(arr, j - 1, j);
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

function test(len = 100, times = 100000) {
  const label = `InsertionSort: times: ${times}, len: ${len}`;
  console.time(label);
  for (let i = 0; i < times; i++) {
    const arr = randomArr(len);
    const input1 = arr.slice();
    const input2 = arr.slice();

    const expected = input1.sort((a, b) => a - b);
    const actual = InsertionSort(input2);

    if (!arrEquals(expected, actual)) {
      console.assert(false, {
        arr,
        expected,
        actual,
      });
      return;
    }
  }
  console.timeEnd(label);
}

const len = +process.argv[2] || 100;
const times = +process.argv[3] || 10000;
test(len, times);
