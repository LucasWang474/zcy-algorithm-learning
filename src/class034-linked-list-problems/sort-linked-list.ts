class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function sortList(head: ListNode | null): ListNode | null {
  if (!head) return null;

  const N = getListLength(head);

  for (let step = 1; step < N; step <<= 1) {
    let l1 = head;
    if (!l1) throw new Error('l1 should not be null');
    let r1 = getEndByK(l1, step);

    let l2 = r1.next;
    if (!l2) continue;

    let r2 = getEndByK(l2, step);

    let next = r2?.next;

    r1.next = null;
    r2.next = null;
    let [start, end] = merge(l1, r1, l2, r2);

    head = start;
    let lastEnd = end;

    while (next) {
      l1 = next;
      r1 = getEndByK(l1, step);

      l2 = r1.next;
      if (!l2) {
        lastEnd.next = l1;
        break;
      }

      r2 = getEndByK(l2, step);
      next = r2.next;

      r1.next = null;
      r2.next = null;
      [start, end] = merge(l1, r1, l2, r2);
      lastEnd.next = start;
      lastEnd = end;
    }
  }

  return head;
}

function merge(l1: ListNode | null, r1: ListNode | null, l2: ListNode | null, r2: ListNode | null) {
  if (!l1 || !l2 || !r1 || !r2) throw new Error('invalid input');
  let start: ListNode,
    end: ListNode = r2,
    pre: ListNode;

  if (l1.val <= l2.val) {
    start = l1;
    pre = l1;
    l1 = l1.next;
  } else {
    start = l2;
    pre = l2;
    l2 = l2.next;
  }

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      pre.next = l1;
      pre = pre.next;
      l1 = l1.next;
    } else {
      pre.next = l2;
      pre = pre.next;
      l2 = l2.next;
    }
  }

  if (l1) {
    pre.next = l1;
    end = r1;
  }
  if (l2) {
    pre.next = l2;
    end = r2;
  }

  return [start, end];
}

function getListLength(head: ListNode | null) {
  let count = 0;
  while (head) {
    head = head.next;
    count++;
  }
  return count;
}

function getEndByK(head: ListNode, k: number) {
  while (--k > 0 && head?.next) {
    head = head.next;
  }
  return head;
}

// [-1,5,3,4,0]
sortList(new ListNode(-1, new ListNode(5, new ListNode(3, new ListNode(4, new ListNode(0))))));
