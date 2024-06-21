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

// https://leetcode.com/problems/binary-tree-level-order-traversal/
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const res: number[][] = [];

  let curLevel = [root];
  while (curLevel.length) {
    const nodes = [];
    const vals = [];

    for (const node of curLevel) {
      vals.push(node.val);
      if (node.left) nodes.push(node.left);
      if (node.right) nodes.push(node.right);
    }

    res.push(vals);
    curLevel = nodes;
  }

  return res;
}

function levelOrder2(root: TreeNode | null): number[][] {
  if (!root) return [];

  const res: number[][] = [];
  const queue = new Array(2001);

  let l = 0;
  let r = 0;
  queue[r++] = root;

  while (l < r) {
    const size = r - l;
    const vals = [];

    for (let i = 0; i < size; i++) {
      const node = queue[l++];
      vals.push(node.val);

      if (node.left) queue[r++] = node.left;
      if (node.right) queue[r++] = node.right;
    }

    res.push(vals);
  }

  return res;
}

function levelOrder3(root: TreeNode | null, depth = 0, res: number[][] = []): number[][] {
  if (!root) return res;

  if (res[depth]) {
    res[depth].push(root.val);
  } else {
    res[depth] = [root.val];
  }

  levelOrder3(root.left, depth + 1, res);
  levelOrder3(root.right, depth + 1, res);
  return res;
}
