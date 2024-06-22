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

// BST
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

// BST
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (!root || !p || !q) return null;

  // Make p less than q
  [p, q] = [p.val < q.val ? p : q, p.val < q.val ? q : p];
  return lowestCommonAncestorRecur(root, p, q);
}

function lowestCommonAncestorRecur(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
  if (!root) return null;

  if (root.val < p.val) return lowestCommonAncestor(root.right, p, q);
  if (root.val > q.val) return lowestCommonAncestor(root.left, p, q);
  return root;
}
