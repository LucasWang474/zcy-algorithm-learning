class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  if (!head) return false;
  if (!head.next) return true;

  // 1. find the middle
  let slow = head,
    fast = head;
  while (slow.next && fast?.next?.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. reverse the right part
  const middle = slow;
  const right = middle.next;
  middle.next = null;
  const rightReversed = reverseList(right);

  // 3. compare
  let ptr1: ListNode | null = head,
    ptr2: ListNode | null = rightReversed;
  let res = true;
  while (ptr1 && ptr2) {
    if (ptr1 !== ptr2) {
      res = false;
      break;
    }
    ptr1 = ptr1.next;
    ptr2 = ptr2.next;
  }

  // 4. restore the right part
  middle.next = reverseList(rightReversed);

  return res;
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
