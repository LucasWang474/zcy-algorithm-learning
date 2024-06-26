class _Node {
  val: number;
  next: _Node | null;
  random: _Node | null;

  constructor(val?: number, next?: _Node, random?: _Node) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

// https://leetcode.com/problems/copy-list-with-random-pointer/
function copyRandomList(head: _Node | null): _Node | null {
  if (!head) return null;

  // Round 1: Copy next
  let ptr = head;
  while (ptr) {
    const next = ptr.next;
    ptr.next = new _Node(ptr.val, next);
    ptr = next;
  }

  // Round 2: copy random
  ptr = head;
  while (ptr) {
    const next = ptr.next.next;
    ptr.next.random = ptr.random?.next || null;
    ptr = next;
  }

  // Round 3: restore
  const res = head.next;

  let ptr1 = head,
    ptr2 = head.next;
  while (ptr1) {
    ptr1.next = ptr2.next;
    ptr1 = ptr1.next;

    ptr2.next = ptr1?.next || null;
    ptr2 = ptr2.next;
  }

  return res;
}
