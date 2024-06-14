import { getRandomArray } from '@/utils/random';
import { isEqualArray, swap } from '@/utils/array';
import process from 'node:process';
import { MyHeap } from '@/utils/heap';

function heapSort(arr: number[]) {
  // Step 1: build the heap

  // if (Math.random() > 0.5) {
  //   // Solution 1: top to bottom
  //   for (let i = 0; i < arr.length; i++) {
  //     heapInsert(arr, i);
  //   }
  // } else {
  //   // Solution 2: bottom to top
  //   for (let i = arr.length - 1; i >= 0; i--) {
  //     heapify(arr, i, arr.length);
  //   }
  // }
  //
  // let size = arr.length;
  // while (size > 0) {
  //   swap(arr, 0, size - 1);
  //   heapify(arr, 0, --size);
  // }

  const maxHeap = new MyHeap((a: number, b: number) => b - a);
  for (let i = 0; i < arr.length; i++) {
    maxHeap.add(arr[i]);
  }

  const res = [];
  while (maxHeap.size) {
    res.push(maxHeap.pop());
  }

  return res;
}

function heapInsert(arr: number[], i: number) {
  while (arr[i] > arr[~~((i - 1) / 2)]) {
    swap(arr, i, ~~((i - 1) / 2));
    i = ~~((i - 1) / 2);
  }
}

function heapify(arr: number[], i: number, heapSize: number) {
  let L = i * 2 + 1;
  while (L < heapSize) {
    let larger = L + 1 < heapSize && arr[L + 1] > arr[L] ? L + 1 : L;
    larger = arr[larger] > arr[i] ? larger : i;

    if (larger === i) return;

    swap(arr, larger, i);
    i = larger;
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
