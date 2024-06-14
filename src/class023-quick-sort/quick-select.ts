// https://leetcode.com/problems/kth-largest-element-in-an-array/description/

import { getRandomArray } from '@/utils/random';
import process from 'node:process';
import { swap } from '@/utils/array';

function findKthLargest(nums: number[], k: number): number {
  return quickSelect(nums, nums.length - k);
}

function quickSelect(arr: number[], i: number) {
  let L = 0,
    R = arr.length - 1;
  while (L <= R) {
    const pivot = arr[L + Math.trunc(Math.random() * (R - L + 1))];
    const [lo, hi] = partition(arr, L, R, pivot);

    if (i < lo) {
      R = lo - 1;
    } else if (i > hi) {
      L = hi + 1;
    } else {
      return arr[i];
    }
  }

  return -1;
}

function partition(arr: number[], L: number, R: number, pivot: number) {
  // lo: the index for the first element that equals to pivot
  // hi: the index for the last element that equals to pivot
  let lo = L,
    hi = R,
    i = L;

  while (i <= hi) {
    const cur = arr[i];

    if (cur < pivot) {
      swap(arr, lo++, i++);
    } else if (cur > pivot) {
      swap(arr, hi--, i);
    } else {
      i++;
    }
  }

  return [lo, hi];
}

function validator(times = 100, arrSize = 10) {
  for (let i = 0; i < times; i++) {
    const inputArr = getRandomArray(arrSize);

    const k = 1 + Math.trunc(Math.random() * inputArr.length);

    const expected = inputArr
      .slice()
      .sort((a, b) => a - b)
      .at(-k);
    const actual = findKthLargest(inputArr.slice(), k);
    if (expected !== actual) {
      console.error(expected, actual, inputArr, k);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

validator(+process.argv[2], +process.argv[3]);
