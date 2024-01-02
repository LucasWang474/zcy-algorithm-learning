function SelectionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    let minI = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minI]) {
        minI = j;
      }
    }

    if (minI !== i) {
      swap(arr, i, minI);
    }
  }
  return arr;
}

function swap(arr: number[], i: number, j: number) {
  arr[i] = arr[i] ^ arr[j];
  arr[j] = arr[i] ^ arr[j];
  arr[i] = arr[i] ^ arr[j];
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
  const label = `SelectionSort: times: ${times}, len: ${len}`;
  console.time(label);
  for (let i = 0; i < times; i++) {
    const input = randomArr(len);
    const expected = input.slice().sort((a, b) => a - b);
    const actual = SelectionSort(input.slice());
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
