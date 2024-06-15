// https://leetcode.com/problems/sort-an-array/

import { getRandomArray } from '@/utils/random';
import { isEqualArray } from '@/utils/array';
import process from 'node:process';

function sortArray(nums: number[]): number[] {
  return radixSort(nums);
}

function radixSort(nums: number[], BASE = 10): number[] {
  const N = nums.length;
  const help = new Array(N);

  const minNum = Math.min(...nums);
  nums = nums.map((num) => num - minNum);

  const maxNum = Math.max(...nums);
  const maxBits = getBitsNum(maxNum, BASE);

  const counts = new Array(BASE).fill(0);

  for (let bitCount = 0, offset = 1; bitCount < maxBits; bitCount++, offset *= BASE) {
    counts.fill(0);

    for (let i = 0; i < N; i++) {
      const val = Math.trunc(nums[i] / offset) % BASE;
      counts[val]++;
    }
    for (let i = 1; i < BASE; i++) {
      counts[i] += counts[i - 1];
    }

    for (let i = N - 1; i >= 0; i--) {
      const num = nums[i];
      const val = Math.trunc(num / offset) % BASE;
      const index = --counts[val];
      help[index] = num;
    }

    for (let i = 0; i < nums.length; i++) {
      nums[i] = help[i];
    }
  }

  return nums.map((num) => num + minNum);
}

function getBitsNum(num: number, BASE: number) {
  let res = 0;
  while (num > 0) {
    res++;
    num = Math.trunc(num / BASE);
  }

  return res;
}

function validator(times = 100, arrSize = 10) {
  for (let i = 0; i < times; i++) {
    const inputArr = getRandomArray(arrSize);
    const expected = inputArr.slice().sort((a, b) => a - b);
    const actual = radixSort(inputArr.slice());
    if (!isEqualArray(expected, actual)) {
      console.error(expected, actual, inputArr);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

validator(+process.argv[2], +process.argv[3]);
