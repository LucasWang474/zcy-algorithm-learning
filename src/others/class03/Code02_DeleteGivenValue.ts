// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * https://leetcode.com/problems/remove-linked-list-elements/description/
 */
function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (!head) return null;

  const dummy = new ListNode(0, head);
  let ptr = dummy;
  while (ptr.next) {
    if (ptr.next.val === val) {
      ptr.next = ptr.next.next;
    } else {
      ptr = ptr.next;
    }
  }
  return dummy.next;
}
