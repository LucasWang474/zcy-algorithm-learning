import * as process from 'process';
import { getRandomArray } from '@/utils/random';
import { isEqualArray, swap } from '@/utils/array';

function bubbleSort(arr: number[]) {
  console.log('>>> You are using bubbleSort');
  const N = arr.length;
  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}

function insertionSort(arr: number[]) {
  console.log('>>> You are using insertionSort');

  const N = arr.length;
  for (let i = 0; i < N; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      swap(arr, j, j - 1);
    }
  }
}

function selectionSort(arr: number[]) {
  const N = arr.length;
  for (let i = 0; i < N; i++) {
    let minIdx = i;
    for (let j = i + 1; j < N; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    swap(arr, i, minIdx);
  }
}

function main(method: string) {
  const arr = getRandomArray();
  const expected = [...arr].sort((a, b) => a - b);
  const actual = [...arr];

  switch (method) {
    case 'bubble':
      bubbleSort(actual);
      break;
    case 'insert':
      insertionSort(actual);
      break;
    case 'select':
    default:
      selectionSort(actual);
      break;
  }

  if (!isEqualArray(expected, actual)) {
    console.log('>>> expected', expected);
    console.log('>>> actual', actual);
    return;
  }

  console.log('>>> Successful sorting');
}

main(process.argv[2]);
