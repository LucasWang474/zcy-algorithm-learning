import { TreeNode } from '@/utils/linked-list';

// https://leetcode.com/problems/binary-tree-preorder-traversal/description/
function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const stack = [root];
  const res = [];

  while (stack.length) {
    const head = stack.pop() as TreeNode;
    res.push(head.val);

    if (head.right) {
      stack.push(head.right);
    }
    if (head.left) {
      stack.push(head.left);
    }
  }

  return res;
}

function preorderTraversalRecur(root: TreeNode | null): number[] {
  if (!root) return [];

  // root -> left -> right
  return [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)];
}
