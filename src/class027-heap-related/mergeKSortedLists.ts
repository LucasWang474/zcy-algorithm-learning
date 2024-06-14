// https://leetcode.com/problems/merge-k-sorted-lists/
import { ListNode } from '@/utils/linked-list';
import { MyHeap } from '@/utils/heap';

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists) return null;

  const minHeap = new MyHeap<ListNode>((a: ListNode, b: ListNode) => a.val - b.val);
  for (const list of lists) {
    if (list) {
      minHeap.add(list);
    }
  }

  const res = minHeap.pop();
  if (!res) return null;

  if (res.next) {
    minHeap.add(res.next);
  }
  let prev = res;

  while (minHeap.size) {
    const cur = minHeap.pop();

    prev.next = cur;
    prev = prev.next;

    if (cur.next) {
      minHeap.add(cur.next);
    }
  }

  return res;
}
