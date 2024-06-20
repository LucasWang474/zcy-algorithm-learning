// https://leetcode.com/problems/intersection-of-two-linked-lists/
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  let ptrA = headA,
    ptrB = headB;
  while (ptrA !== ptrB) {
    ptrA = ptrA ? ptrA.next : headB;
    ptrB = ptrB ? ptrB.next : headA;
  }
  return ptrA;
}
