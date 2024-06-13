export class MyListNode<T> {
  val: T;
  next: MyListNode<T> | null = null;

  constructor(val: T) {
    this.val = val;
    this.next = null;
  }

  toCopy() {
    const res = new MyListNode<T>(this.val);
    let ptr = res;
    let head = this.next;
    while (head) {
      ptr.next = new MyListNode<T>(head.val);
      ptr = ptr.next;
      head = head.next;
    }
    return res;
  }

  toString() {
    let res = String(this.val);

    let head = this.next;
    while (head) {
      res += '->' + head.val;
      head = head.next;
    }

    return res;
  }

  toArray() {
    const res: T[] = [this.val];

    let head = this.next;
    while (head) {
      res.push(head.val);
      head = head.next;
    }

    return res;
  }
}

/**
 * LeetCode ListNode
 */
export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export function arrToTree(arr: (null | undefined | number)[]) {
  if (!arr.length) return null;
  if (!arr[0]) return null;

  const root = new TreeNode(arr[0]);

  const stack: [TreeNode, number][] = [[root, 0]];

  while (stack.length) {
    const [head, index] = stack.pop() as [TreeNode, number];

    // left child
    const leftIdx = index * 2 + 1,
      rightIdx = index * 2 + 2;
    if (typeof arr[leftIdx] === 'number') {
      head.left = new TreeNode(arr[leftIdx] as number);
      stack.push([head.left, leftIdx]);
    }
    if (typeof arr[rightIdx] === 'number') {
      head.right = new TreeNode(arr[rightIdx] as number);
      stack.push([head.right, rightIdx]);
    }
  }

  return root;
}
