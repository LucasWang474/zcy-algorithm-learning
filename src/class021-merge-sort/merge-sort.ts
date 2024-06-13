import { getRandomArray } from '@/utils/random';
import { isEqualArray } from '@/utils/array';
import * as process from 'node:process';

let help: number[] = [];

function mergeSort(arr: number[]) {
  help = new Array(arr.length);
  mergeSortRecur(arr, 0, arr.length - 1);
  return arr;
}

function mergeSortRecur(arr: number[], L: number, R: number) {
  if (L >= R) return;

  const M = L + ((R - L) >>> 1);
  mergeSortRecur(arr, L, M);
  mergeSortRecur(arr, M + 1, R);
  merge(arr, L, M, R);
}

function mergeSortIter(arr: number[]) {
  help = new Array(arr.length);

  for (let step = 1; step < arr.length; step *= 2) {
    let L = 0,
      M,
      R;
    while (L + step < arr.length) {
      M = L + step - 1;
      R = Math.min(arr.length - 1, L + step * 2 - 1);

      merge(arr, L, M, R);

      L = R + 1;
    }
  }

  return arr;
}

function merge(arr: number[], L: number, M: number, R: number) {
  if (L >= R) return;

  let i = L,
    lo = L,
    hi = M + 1;
  while (lo <= M && hi <= R) {
    help[i++] = arr[lo] <= arr[hi] ? arr[lo++] : arr[hi++];
  }
  while (lo <= M) {
    help[i++] = arr[lo++];
  }
  while (hi <= R) {
    help[i++] = arr[hi++];
  }
  for (let j = L; j <= R; j++) {
    arr[j] = help[j];
  }
}

function validator(times = 100) {
  for (let i = 0; i < times; i++) {
    const inputArr = getRandomArray(100);
    const expected = inputArr.slice().sort((a, b) => a - b);
    const actual = mergeSortIter(inputArr.slice());
    if (!isEqualArray(expected, actual)) {
      console.error(expected, actual);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

validator(+process.argv[2]);
