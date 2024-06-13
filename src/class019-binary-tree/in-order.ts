import { TreeNode } from '@/utils/linked-list';

function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const stack: TreeNode[] = [];
  const res = [];
  let head: TreeNode | null = root;

  while (stack.length || head) {
    if (head) {
      stack.push(head);
      head = head.left;
    } else {
      head = stack.pop() as TreeNode;
      res.push(head.val);
      head = head.right;
    }
  }

  return res;
}

// https://leetcode.com/problems/binary-tree-inorder-traversal/
function inorderTraversal2(root: TreeNode | null): number[] {
  if (!root) return [];

  const stack: (TreeNode | number)[] = [root];
  const res = [];

  while (stack.length) {
    const head = stack.pop();

    if (typeof head === 'number') {
      res.push(head);
    } else if (head) {
      if (head.right) {
        stack.push(head.right);
      }
      stack.push(head.val);
      if (head.left) {
        stack.push(head.left);
      }
    }
  }

  return res;
}

function inorderTraversalRecur(root: TreeNode | null): number[] {
  if (!root) return [];

  return [...inorderTraversalRecur(root.left), root.val, ...inorderTraversalRecur(root.right)];
}
