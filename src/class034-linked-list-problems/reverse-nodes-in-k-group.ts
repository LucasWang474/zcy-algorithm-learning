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
  if (k === 1 || !head) return head;

  const oldTail = getNodeEnd(head, k);

  if (!oldTail) return head;

  const nextHead = oldTail.next;
  oldTail.next = null;

  const newTail = head;
  const newHead = reverseList(head);

  newTail.next = reverseKGroup(nextHead, k);
  return newHead;
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (k === 1 || !head) return head;

  let oldTail = getNodeEnd(head, k);
  if (!oldTail) return head;

  let nextHead = oldTail.next;
  oldTail.next = null;

  const newHead = reverseList(head);

  let prevTail = head;
  while (nextHead) {
    oldTail = getNodeEnd(nextHead, k);
    if (!oldTail) {
      prevTail.next = nextHead;
      break;
    }

    const next = oldTail.next;
    oldTail.next = null;

    prevTail.next = reverseList(nextHead);
    prevTail = nextHead;
    nextHead = next;
  }

  return newHead;
}

function getNodeEnd(head: ListNode | null, k: number) {
  let res = head;
  for (let i = 0; i < k - 1; i++) {
    if (!res) break;
    res = res.next;
  }
  return res;
}

function reverseList(head: ListNode | null) {
  if (!head) return null;

  let reversed = null;
  while (head) {
    const next = head.next;
    head.next = reversed;
    reversed = head;
    head = next;
  }
  return reversed;
}
