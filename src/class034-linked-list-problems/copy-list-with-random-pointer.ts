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

  let ptr: _Node | null = head,
    next: _Node | null = null;
  while (ptr) {
    next = ptr.next;

    ptr.next = new _Node(ptr.val, next || undefined);
    ptr = next;
  }

  ptr = head;
  while (ptr?.next) {
    ptr.next.random = ptr.random?.next || null;
    ptr = ptr.next.next;
  }

  const res = head.next;
  let ptrOld: ListNode | null = head;
  let ptrNew: ListNode | null = head.next;
  while (ptrOld && ptrNew) {
    const next = ptrNew.next;
    ptrNew.next = next?.next || null;
    ptrOld.next = next;

    ptrNew = next?.next || null;
    ptrOld = next || null;
  }

  return res as _Node;
}
