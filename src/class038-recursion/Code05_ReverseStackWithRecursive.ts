import { getRandomArray } from '@/utils/random';
import { isEqualArray } from '@/utils/array';
import process from 'node:process';

function reverseStack(stack: number[]): number[] {
  if (stack.length <= 1) return stack;

  const bottom = bottomUp(stack);
  reverseStack(stack);
  stack.push(bottom);
  return stack;
}

function bottomUp(stack: number[]): number {
  if (stack.length === 1) return stack.pop() as number;

  const top = stack.pop() as number;
  const bottom = bottomUp(stack);
  stack.push(top);
  return bottom;
}

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
