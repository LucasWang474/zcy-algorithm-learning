import { getRandomArray } from '@/utils/random';
import { isEqualArray } from '@/utils/array';
import * as process from 'node:process';

let aux: number[] = [];

function mergeSort(arr: number[]) {
  aux = new Array(arr.length).fill(0);
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

function merge(arr: number[], L: number, M: number, R: number) {
  if (L >= R) return;

  let i = L,
    lo = L,
    hi = M + 1;
  while (lo <= M && hi <= R) {
    aux[i++] = arr[lo] <= arr[hi] ? arr[lo++] : arr[hi++];
  }
  while (lo <= M) {
    aux[i++] = arr[lo++];
  }
  while (hi <= R) {
    aux[i++] = arr[hi++];
  }
  for (let j = L; j <= R; j++) {
    arr[j] = aux[j];
  }
}

function validator(times = 100) {
  for (let i = 0; i < times; i++) {
    const inputArr = getRandomArray(100);
    const expected = inputArr.slice().sort((a, b) => a - b);
    const actual = mergeSort(inputArr.slice());
    if (!isEqualArray(expected, actual)) {
      console.error(expected, actual);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

validator(+process.argv[2]);
