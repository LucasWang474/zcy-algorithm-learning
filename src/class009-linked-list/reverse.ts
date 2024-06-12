import { getRandomLinkedList } from '@/utils/random';
import { isEqualArray } from '@/utils/array';
import * as process from 'node:process';
import { MyListNode } from '@/utils/linked-list';

function reverseList<T>(node: MyListNode<T> | null) {
  if (!node) return null;

  let reversed = null;

  let head: MyListNode<T> | null = node;

  while (head) {
    const next: MyListNode<T> | null = head.next;
    head.next = reversed;
    reversed = head;
    head = next;
  }

  return reversed;
}

function reverseListRecur<T>(node: MyListNode<T> | null): MyListNode<T> | null {
  if (!node) return null;
  if (!node.next) return node;

  const newTail = node.next;
  const reversed = reverseListRecur(node.next);
  newTail.next = node;
  node.next = null;
  return reversed;
}

function validator(times = 100) {
  for (let i = 0; i < times; i++) {
    const linkedList = getRandomLinkedList(10);
    const expected = linkedList?.toArray()?.reverse() || [];

    const func = Math.random() > 0.5 ? reverseList : reverseListRecur;
    const reversed = func(linkedList);
    const reversedNumsArray = reversed?.toArray() || [];

    if (!isEqualArray(expected, reversedNumsArray)) {
      console.error(expected, reversedNumsArray);
      return;
    }
  }

  console.log('All passed!', times);
}

validator(+process.argv[2] || 100);
