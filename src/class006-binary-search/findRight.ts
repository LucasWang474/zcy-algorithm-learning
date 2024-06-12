/**
 * Find the rightmost number which is less than or equals to the target.
 */
import { getRandomArrays } from '@/utils/random';
import { sortNumsArrayInPlace } from '@/utils/array';

function bf(nums: number[], target: number) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] <= target) {
      return i;
    }
  }

  return -1;
}

function findRight(nums: number[], target: number) {
  let L = 0,
    R = nums.length - 1,
    M: number,
    cur: number;
  let res = -1;
  while (L <= R) {
    M = L + ((R - L) >>> 1);
    cur = nums[M];

    if (cur <= target) {
      res = M;
      L = M + 1;
    } else {
      R = M - 1;
    }
  }

  return res;
}

function validator() {
  const times = 1000;
  const arrSize = 1000;

  for (let i = 0; i < times; i++) {
    const target = Math.trunc(Math.random() * 100);
    const nums = sortNumsArrayInPlace(getRandomArrays(arrSize));
    const expected = bf(nums.slice(), target);
    const actual = findRight(nums.slice(), target);
    if (expected !== actual) {
      console.error(nums, expected, actual);
      return;
    }
  }
  console.log('All passed');
}

validator();
