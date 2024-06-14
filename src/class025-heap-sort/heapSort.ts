import { getRandomArray } from '@/utils/random';
import { isEqualArray, swap } from '@/utils/array';
import process from 'node:process';

function heapSort(arr: number[]) {
  // Step 1: build the heap

  if (Math.random() > 0.5) {
    // Solution 1: top to bottom
    for (let i = 0; i < arr.length; i++) {
      heapInsert(arr, i);
    }
  } else {
    // Solution 2: bottom to top
    for (let i = arr.length - 1; i >= 0; i--) {
      heapify(arr, i, arr.length);
    }
  }

  let size = arr.length;
  while (size > 0) {
    swap(arr, 0, size - 1);
    heapify(arr, 0, --size);
  }

  return arr;
}

function heapInsert(arr: number[], i: number) {
  let parent = Math.trunc((i - 1) / 2);
  while (parent >= 0 && arr[i] > arr[parent]) {
    swap(arr, i, parent);

    i = parent;
    parent = Math.trunc((i - 1) / 2);
  }
}

function heapify(arr: number[], i: number, heapSize: number) {
  let L = i * 2 + 1;
  while (L < heapSize) {
    const larger = L + 1 < heapSize && arr[L + 1] > arr[L] ? L + 1 : L;
    const newI = arr[larger] > arr[i] ? larger : i;

    if (newI === i) return;

    swap(arr, newI, i);
    i = newI;
    L = i * 2 + 1;
  }
}

function validator(times = 100, arrSize = 10) {
  for (let i = 0; i < times; i++) {
    const inputArr = getRandomArray(arrSize);
    const expected = inputArr.slice().sort((a, b) => a - b);
    const actual = heapSort(inputArr.slice());
    if (!isEqualArray(expected, actual)) {
      console.error(expected, actual);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

validator(+process.argv[2], +process.argv[3]);
