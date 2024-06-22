// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

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

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (!root || !p || !q) return null;

  [p, q] = [p.val < q.val ? p : q, p.val < q.val ? q : p];

  while (root && root.val !== p.val && root.val !== q.val) {
    if (root.val > p.val && root.val < q.val) break;
    root = root.val < p.val ? root.right : root.left;
  }

  return root;
}
