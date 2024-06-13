import { TreeNode } from '@/utils/linked-list';

function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const stack: (TreeNode | number)[] = [root];
  const res = [];

  while (stack.length) {
    const head = stack.pop();
    if (typeof head === 'number') {
      res.push(head);
    } else if (head) {
      stack.push(head.val);
      if (head.right) {
        stack.push(head.right);
      }
      if (head.left) {
        stack.push(head.left);
      }
    }
  }

  return res;
}

function postorderTraversalRecur(root: TreeNode | null): number[] {
  // left -> right -> root
  if (!root) return [];

  return [...postorderTraversalRecur(root.left), ...postorderTraversalRecur(root.right), root.val];
}
