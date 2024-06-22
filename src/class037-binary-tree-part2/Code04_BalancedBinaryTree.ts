// https://leetcode.com/problems/balanced-binary-tree/

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

function isBalanced(root: TreeNode | null): boolean {
  const info = { balanced: true };
  dfs(root, info);
  return info.balanced;
}

function dfs(root: TreeNode | null, info: { balanced: boolean }): number {
  if (!root || !info.balanced) return 0;

  const leftHeight = dfs(root.left, info);
  const rightHeight = dfs(root.right, info);

  if (Math.abs(leftHeight - rightHeight) >= 2) {
    info.balanced = false;
    return 0;
  }

  return 1 + Math.max(leftHeight, rightHeight);
}
