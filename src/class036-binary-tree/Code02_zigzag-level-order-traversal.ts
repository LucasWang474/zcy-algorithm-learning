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

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  return zigzagLevelOrderRecur(root);
}

function zigzagLevelOrderIter(root: TreeNode | null): number[][] {
  if (!root) return [];

  let reverse = false;
  let queue = [root];
  const res: number[][] = [];

  while (queue.length) {
    const vals = [];
    const nodes = [];

    for (const node of queue) {
      vals.push(node.val);

      if (node.left) nodes.push(node.left);
      if (node.right) nodes.push(node.right);
    }

    res.push(reverse ? vals.reverse() : vals);
    queue = nodes;
    reverse = !reverse;
  }

  return res;
}

function zigzagLevelOrderRecur(
  root: TreeNode | null,
  depth = 0,
  reverse = false,
  res: number[][] = [],
): number[][] {
  if (!root) return res;

  if (res[depth]) {
    res[depth].push(root.val);
  } else {
    res[depth] = [root.val];
  }

  zigzagLevelOrderRecur(root.left, depth + 1, !reverse, res);
  zigzagLevelOrderRecur(root.right, depth + 1, !reverse, res);

  if (depth === 0) {
    for (let i = 1; i < res.length; i++) {
      const needReverse = i % 2;
      if (needReverse) res[i].reverse();
    }
  }

  return res;
}
