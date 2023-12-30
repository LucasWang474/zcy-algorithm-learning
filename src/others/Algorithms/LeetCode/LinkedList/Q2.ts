/**
 * https://leetcode.com/problems/add-two-numbers/
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode();
  let ptr1 = l1,
    ptr2 = l2,
    resPtr = dummy;
  let carry = 0;

  while (ptr1 || ptr2 || carry > 0) {
    let sum = carry;
    if (ptr1) {
      sum += ptr1.val;
      ptr1 = ptr1.next;
    }
    if (ptr2) {
      sum += ptr2.val;
      ptr2 = ptr2.next;
    }
    resPtr.next = new ListNode(sum % 10);
    resPtr = resPtr.next;
    carry = ~~(sum / 10);
  }

  return dummy.next;
}
