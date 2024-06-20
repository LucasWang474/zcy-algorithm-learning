class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Constraints:
// The number of nodes in the list is n.
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000

// Follow-up: Can you solve the problem in O(1) extra memory space?

function reverseKGroupRecur(head: ListNode | null, k: number): ListNode | null {
  if (!head) return null;
  if (k === 1) return head;

  let ptr: ListNode | null = head;
  for (let i = 0; i < k - 1; i++) {
    if (!ptr) break;
    ptr = ptr.next;
  }
  if (!ptr) return head;

  const next = ptr.next;
  ptr.next = null;

  const newHead = reverseList(head);
  const newTail = head;
  newTail.next = reverseKGroupRecur(next, k);

  return newHead;
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (!head) return null;
  if (k === 1) return head;

  let res;
  let ptr: ListNode | null = head;
  let prevTail: ListNode | null = null;

  while (ptr) {
    const oldHead = ptr;
    const oldTail = getGroupKEnd(ptr, k);
    if (!oldTail) break;

    const next: ListNode | null = oldTail.next;
    oldTail.next = null;

    const reversed = reverseList(oldHead);

    if (!res) res = reversed;

    if (prevTail) prevTail.next = reversed;
    prevTail = oldHead;

    oldHead.next = next;
    ptr = next;
  }

  return res || head;
}

function getGroupKEnd(node: ListNode | null, k: number) {
  for (let i = 0; i < k - 1; i++) {
    if (!node) break;
    node = node.next;
  }
  return node;
}

function reverseList(node: ListNode | null) {
  if (!node) return null;

  let reversed = null;

  let head: ListNode | null = node;

  while (head) {
    const next: ListNode | null = head.next;
    head.next = reversed;
    reversed = head;
    head = next;
  }

  return reversed;
}
