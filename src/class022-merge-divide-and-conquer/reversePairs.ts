// https://leetcode.com/problems/reverse-pairs/description/

import { getRandomArray } from '@/utils/random';

let help: number[] = [];

// A reverse pair is a pair (i, j) where:
// 0 <= i < j < nums.length and
// nums[i] > 2 * nums[j].
function reversePairs(arr: number[]) {
  if (arr.length <= 1) return 0;

  help = new Array(arr.length);
  return reversePairsHelper(arr, 0, arr.length - 1);
}

function reversePairsHelper(arr: number[], L: number, R: number): number {
  if (L >= R) return 0;

  const M = (L + R) >> 1;
  return reversePairsHelper(arr, L, M) + reversePairsHelper(arr, M + 1, R) + merge(arr, L, M, R);
}

function merge(arr: number[], L: number, M: number, R: number): number {
  if (L >= R) return 0;

  let res = 0;

  // Compute small sum when merging
  // for (let i = L, j = M + 1; j <= R; j++) {
  //   while (i <= M && arr[i] <= arr[j] * 2) {
  //     i++;
  //   }
  //
  //   if (i > M) break;
  //
  //   res += M - i + 1;
  // }

  // Another method
  for (let i = L, j = M + 1; i <= M; i++) {
    while (j <= R && arr[i] > arr[j] * 2) {
      j++;
    }

    res += j - (M + 1);
  }

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

function reversePairsBF(arr: number[]): number {
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];

    for (let j = i + 1; j < arr.length; j++) {
      if (cur > arr[j] * 2) {
        res++;
      }
    }
  }
  return res;
}

function validator(times = 100, arrSize = 10) {
  for (let i = 0; i < times; i++) {
    const input = getRandomArray(arrSize);
    const expected = reversePairsBF(input.slice());
    const actual = reversePairs(input.slice());
    if (expected !== actual) {
      console.error(expected, actual, input);
      return;
    }
  }
  console.log('All passed!', times);
}

validator(+process.argv[2], +process.argv[3]);
