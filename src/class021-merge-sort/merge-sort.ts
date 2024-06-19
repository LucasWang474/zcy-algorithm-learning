import { getRandomArray } from '@/utils/random';
import { isEqualArray } from '@/utils/array';
import * as process from 'node:process';

function mergeSort(arr: number[]) {
  const helper = new Array(arr.length);
  mergeSortRecur(arr, helper, 0, arr.length - 1);
  return arr;
}

function mergeSortRecur(arr: number[], helper: number[], L: number, R: number) {
  if (L >= R) return;

  const M = L + ((R - L) >>> 1);
  mergeSortRecur(arr, helper, L, M);
  mergeSortRecur(arr, helper, M + 1, R);
  merge(arr, helper, L, M, R);
}

function mergeSortIter(arr: number[]) {
  const helper = new Array(arr.length);

  for (let step = 1; step < arr.length; step *= 2) {
    let L = 0,
      M,
      R;
    while (L + step < arr.length) {
      M = L + step - 1;
      R = Math.min(arr.length - 1, L + step * 2 - 1);

      merge(arr, helper, L, M, R);

      L = R + 1;
    }
  }

  return arr;
}

function merge(nums: number[], helper: number[], L: number, M: number, R: number) {
  if (L >= R) return;

  for (let k = L; k <= R; k++) {
    helper[k] = nums[k];
  }

  let i = L,
    j = M + 1;
  for (let k = L; k <= R; k++) {
    nums[k] = j > R || (i <= M && helper[i] < helper[j]) ? helper[i++] : helper[j++];
  }
}

function validator(times = 100) {
  for (let i = 0; i < times; i++) {
    const inputArr = getRandomArray(100);
    const expected = inputArr.slice().sort((a, b) => a - b);
    const actual = (Math.random() > 0.5 ? mergeSortIter : mergeSort)(inputArr.slice());
    if (!isEqualArray(expected, actual)) {
      console.error(expected, actual);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

validator(+process.argv[2]);
