// https://leetcode.com/problems/house-robber-iii/

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

function rob(root: TreeNode | null): number {
  return Math.max(...robRecur(root));
}

// [includeRoot, excludeRoot]
function robRecur(root: TreeNode | null): [number, number] {
  if (!root) return [0, 0];

  const [include1, exclude1] = robRecur(root.left);
  const [include2, exclude2] = robRecur(root.right);

  return [
    root.val + exclude1 + exclude2,
    Math.max(include1, exclude1) + Math.max(include2, exclude2),
  ];
}
