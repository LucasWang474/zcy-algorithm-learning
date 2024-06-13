// https://www.nowcoder.com/practice/edfe05a1d45c4ea89101d936cac32469

// const readline = require('readline');
//
// let n: number;
// let nums: number[] = [];
//
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// rl.on('line', function (line: string) {
//   if (n === undefined) {
//     n = parseInt(line.trim());
//   } else {
//     nums = line.split(' ').map(Number);
//
//     console.log(smallSum(nums));
//   }
// });

import * as process from 'node:process';
import { getRandomArray } from '@/utils/random';

let help: number[] = [];

function smallSum(arr: number[]) {
  if (arr.length <= 1) return 0;

  help = new Array(arr.length);
  return smallSumHelper(arr, 0, arr.length - 1);
}

function smallSumHelper(arr: number[], L: number, R: number): number {
  if (L >= R) return 0;

  const M = (L + R) >> 1;
  return smallSumHelper(arr, L, M) + smallSumHelper(arr, M + 1, R) + merge(arr, L, M, R);
}

function merge(arr: number[], L: number, M: number, R: number): number {
  if (L >= R) return 0;

  let res = 0;

  // Compute small sum when merging
  for (let i = L, j = M + 1, sum = 0; j <= R; j++) {
    while (i <= M && arr[i] <= arr[j]) {
      sum += arr[i];
      i++;
    }

    res += sum;
  }

  // Another method
  // for (let i = L, j = M + 1; i <= M; i++) {
  //   while (j <= R && arr[j] < arr[i]) {
  //     j++;
  //   }
  //
  //   res += arr[i] * (R - j + 1);
  // }

  // Normal merge
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

  return res;
}

function smallSumBF(arr: number[]): number {
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] >= cur) {
        res += cur;
      }
    }
  }
  return res;
}

function validator(times = 100, arrSize = 10) {
  for (let i = 0; i < times; i++) {
    const input = getRandomArray(arrSize);
    const expected = smallSumBF(input.slice());
    const actual = smallSum(input.slice());
    if (expected !== actual) {
      console.error(expected, actual, input);
      return;
    }
  }
  console.log('All passed!', times);
}

validator(+process.argv[2], +process.argv[3]);
