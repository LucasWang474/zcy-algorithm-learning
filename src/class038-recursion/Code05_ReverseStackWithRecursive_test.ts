import { getRandomArray } from '@/utils/random';
import { isEqualArray } from '@/utils/array';
import process from 'node:process';

function reverseStack(stack: number[]): number[] {}

function validator(times = 100) {
  for (let i = 0; i < times; i++) {
    const arr = getRandomArray(20);

    const expected = arr.slice().reverse();
    const actual = reverseStack(arr.slice());
    if (!isEqualArray(expected, actual)) {
      console.error(expected, actual);
      return;
    }
  }

  console.log('>>> All passed!', times);
}

validator(+process.argv[2]);
