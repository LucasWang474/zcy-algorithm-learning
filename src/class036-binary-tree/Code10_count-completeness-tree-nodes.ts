// https://leetcode.com/problems/count-complete-tree-nodes/

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function countNodes(root: TreeNode | null): number {
  return countNodesRecur(root, 1, calcTreeHeight(root));
}

function countNodesRecur(root: TreeNode | null, level: number, height: number): number {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;

  const rootHeight = height - level + 1;
  const leftHeight = rootHeight - 1;
  const rightHeight = calcTreeHeight(root.right);

  if (rightHeight === leftHeight) {
    return 1 + (2 ** leftHeight - 1) + countNodesRecur(root.right, level + 1, height);
  } else {
    return 1 + (2 ** rightHeight - 1) + countNodesRecur(root.left, level + 1, height);
  }
}

function calcTreeHeight(root: TreeNode | null) {
  if (!root) return 0;

  let count = 0;
  while (root) {
    count++;
    root = root.left;
  }
  return count;
}
