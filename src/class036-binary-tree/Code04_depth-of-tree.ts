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

// https://leetcode.com/problems/maximum-depth-of-binary-tree/
function maxDepthRecur(root: TreeNode | null): number {
  if (!root) return 0;

  return 1 + Math.max(maxDepthRecur(root.left), maxDepthRecur(root.right));
}

// https://leetcode.com/problems/maximum-depth-of-binary-tree/
function maxDepthIter(root: TreeNode | null): number {
  if (!root) return 0;

  let depth = 0;
  let curLevel = [root];

  while (curLevel.length) {
    depth++;

    const nextLevel = [];

    for (const node of curLevel) {
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }

    curLevel = nextLevel;
  }

  return depth;
}

// https://leetcode.com/problems/minimum-depth-of-binary-tree/
function minDepthRecur(root: TreeNode | null): number {
  if (!root) return 0;

  const leftDepth = minDepthRecur(root.left);
  const rightDepth = minDepthRecur(root.right);

  if (!leftDepth || !rightDepth) {
    return 1 + Math.max(leftDepth, rightDepth);
  }

  return 1 + Math.min(leftDepth, rightDepth);
}

// https://leetcode.com/problems/minimum-depth-of-binary-tree/
function minDepthIter(root: TreeNode | null): number {
  if (!root) return 0;

  let depth = 0;
  let min = Number.MAX_VALUE;
  let curLevel = [root];

  while (curLevel.length) {
    depth++;

    const nextLevel = [];

    for (const node of curLevel) {
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);

      if (!node.left && !node.right) {
        min = Math.min(min, depth);
      }
    }

    curLevel = nextLevel;
  }

  return min;
}
