function detectCycle(head: ListNode | null): ListNode | null {
  if (!head) return null;

  // Check if there's a cycle and get the joint
  let slow = head,
    fast = head;
  while (fast?.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      break;
    }
  }
  if (!fast?.next) return null;

  let ptr1 = head,
    ptr2 = slow;
  while (ptr1 !== ptr2) {
    ptr1 = ptr1.next;
    ptr2 = ptr2.next;
  }

  return ptr1;
}

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
