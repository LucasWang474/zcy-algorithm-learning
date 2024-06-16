import { MyListNode } from './linked-list';

export function getRandomArray(
  size = 100,
  opts?: {
    nonNegative?: boolean;
  },
) {
  const res: number[] = new Array(size);
  for (let i = 0; i < res.length; i++) {
    res[i] = Math.trunc((opts?.nonNegative ? Math.random() : Math.random() - Math.random()) * 100);
  }
  return res;
}

export function getRandomInteger(
  maxNum = 100,
  opts?: {
    nonNegative?: boolean;
  },
) {
  return Math.trunc((opts?.nonNegative ? Math.random() : Math.random() - Math.random()) * maxNum);
}

export function getRandomLinkedList(length = 10) {
  const dummy = new MyListNode<number>(Math.trunc(Math.random() * 100));
  let ptr = dummy;
  for (let i = 0; i < length - 1; i++) {
    ptr.next = new MyListNode<number>(Math.trunc(Math.random() * 100));
    ptr = ptr.next;
  }
  return dummy;
}
