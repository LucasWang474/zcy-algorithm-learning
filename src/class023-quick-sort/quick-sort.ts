import { getRandomArray } from '@/utils/random';
import { isEqualArray, swap } from '@/utils/array';
import process from 'node:process';

function quickSort(arr: number[]) {
  quickSortRecur(arr, 0, arr.length - 1);
  return arr;
}

function quickSortRecur(arr: number[], L: number, R: number) {
  if (L >= R) return;

  const i = L + Math.trunc(Math.random() * (R - L + 1));
  const pivot = arr[i];
  const [lo, hi] = partition(arr, L, R, pivot);

  quickSortRecur(arr, L, lo - 1);
  quickSortRecur(arr, hi + 1, R);
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
    const expected = inputArr.slice().sort((a, b) => a - b);
    const actual = quickSort(inputArr.slice());
    if (!isEqualArray(expected, actual)) {
      console.error(expected, actual);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

validator(+process.argv[2], +process.argv[3]);
