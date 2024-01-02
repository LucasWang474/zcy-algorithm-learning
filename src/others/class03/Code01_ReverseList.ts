import * as process from 'process';

class SList<T> {
  public value: T;
  public next: SList<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }

  toArray() {
    const res = [this.value];
    let head = this.next;
    while (head) {
      res.push(head.value);
      head = head.next;
    }
    return res;
  }
}

class DList<T> {
  public value: T;
  public prev: DList<T> | null;
  public next: DList<T> | null;

  constructor(value: T) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  toArray() {
    const res = [this.value];
    let head = this.next;
    while (head) {
      res.push(head.value);
      head = head.next;
    }
    return res;
  }
}

function arrEquals(arr1: any[] | undefined, arr2: any[] | undefined): boolean {
  if (arr1 === arr2) return true;
  if (!arr1 || !arr2) return false;

  if (arr1?.length !== arr2?.length) return false;
  for (let i = 0; i < arr1?.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function reverseListIter(head: SList<any> | null) {
  let reversed = null;
  while (head) {
    let tempNext = head.next;
    head.next = reversed;
    reversed = head;
    head = tempNext;
  }
  return reversed;
}

function reverseListRecur(head: SList<any> | null) {
  if (!head || !head.next) return head;

  const newHead = reverseListRecur(head.next) as SList<any>;
  const newTail = head.next;
  newTail.next = head;
  head.next = null;
  return newHead;
}

function bf(head: SList<any> | null) {
  if (!head) return null;

  const arr = head.toArray();
  const dummy = new SList(0);
  let ptr = dummy;
  while (head) {
    ptr.next = new SList(arr.pop());
    ptr = ptr.next;
    head = head.next;
  }
  return dummy.next;
}

function getRandomList(maxLen = 20, maxNum = 1000000): SList<number> | null {
  const len = Math.trunc(Math.random() * (maxLen + 1));
  let res = null;
  for (let i = 0; i < len; i++) {
    const cur = new SList(Math.trunc(Math.random() * maxNum - Math.random() * maxNum));
    cur.next = res;
    res = cur;
  }
  return res;
}

function copyList(head: SList<any> | null) {
  const dummy = new SList(0);
  let ptr = dummy;
  while (head) {
    ptr.next = new SList<any>(head.value);
    ptr = ptr.next;
    head = head.next;
  }
  return dummy.next;
}

function test(times: number) {
  const label = `Code01_ReverseList.ts: ${times} times`;
  console.time(label);
  for (let i = 0; i < times; i++) {
    const list1 = getRandomList();
    const list2 = copyList(list1);
    const list3 = copyList(list1);

    const expected = bf(list1)?.toArray();
    const actual = reverseListIter(list2)?.toArray();

    if (!arrEquals(expected, actual)) {
      console.assert(false, {
        expected,
        actual,
      });
      return;
    }

    const actual2 = reverseListRecur(list3)?.toArray();
    if (!arrEquals(expected, actual2)) {
      console.assert(false, {
        expected,
        actual2,
      });
      return;
    }
  }
  console.timeEnd(label);
}

test(+process.argv[2] || 1000);
