/**
 * Find a local max element in the number array
 */
import { getRandomInteger } from '@/utils/random';
import * as process from 'node:process';

function generateRandomArray(arraySize = 100, maxNum = 100) {
  const arr: number[] = [];
  for (let i = 0; i < arraySize; i++) {
    let num;
    do {
      num = getRandomInteger(maxNum);
    } while (i >= 1 && num === arr[i - 1]);
    arr.push(num);
  }

  return arr;
}

function findPeak(arr: number[]) {
  if (arr.length < 1) return -1;
  if (arr.length === 1) return 0;

  if (arr[0] > arr[1]) return 0;

  if (arr[arr.length - 1] > arr[arr.length - 2]) return arr.length - 1;

  let L = 0,
    R = arr.length - 1,
    M: number,
    cur: number;

  while (L <= R) {
    M = L + ((R - L) >>> 1);
    cur = arr[M];

    if (cur < arr[M - 1]) {
      R = M - 1;
    } else if (cur < arr[M + 1]) {
      L = M + 1;
    } else {
      return M;
    }
  }

  return -1;
}

function checkIsPeak(arr: number[], index: number) {
  if (index < 0) return arr.length <= 0;
  if (index === 0) return arr[index] > arr[index + 1];
  if (index === arr.length - 1) return arr[index] > arr[index - 1];
  return arr[index] > arr[index + 1] && arr[index] > arr[index - 1];
}

function validator(times = 100) {
  const start = performance.now();

  for (let i = 0; i < times; i++) {
    const input = generateRandomArray();
    const res = findPeak(input.slice());
    if (!checkIsPeak(input, res)) {
      console.error(input, res);
      return;
    }
  }
  const end = performance.now();
  console.log('>>> end - start', end - start);
  console.log('All passed');
}

validator(+process.argv[2]);
