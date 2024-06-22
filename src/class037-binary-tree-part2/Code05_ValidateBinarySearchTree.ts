// https://leetcode.com/problems/validate-binary-search-tree/

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

function isValidBST(root: TreeNode | null): boolean {
  return isValidBSTRecur(root);
}

function isValidBSTRecur(root: TreeNode | null, lower = -Infinity, upper = Infinity): boolean {
  if (!root) return true;

  if (root.val <= lower || root.val >= upper) return false;
  if (!root.left && !root.right) return true;

  if (root.left && root.left.val >= root.val) return false;
  if (root.right && root.right.val <= root.val) return false;

  return (
    isValidBSTRecur(root.left, lower, root.val) && isValidBSTRecur(root.right, root.val, upper)
  );
}
