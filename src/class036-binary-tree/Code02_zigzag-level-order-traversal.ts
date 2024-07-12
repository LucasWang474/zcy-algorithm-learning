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
  let curLevel = [root];
  const res: number[][] = [];

  while (curLevel.length) {
    const nextLevel = [];
    const vals = [];

    for (const node of curLevel) {
      vals.push(node.val);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }

    if (reverse) vals.reverse();
    reverse = !reverse;

    curLevel = nextLevel;
    res.push(vals);
  }

  return res;
}

function zigzagLevelOrderRecur(root: TreeNode | null, depth = 0, res: number[][] = []): number[][] {
  if (!root) return res;

  zigzagLevelOrderRecur(root.left, depth + 1, res);
  zigzagLevelOrderRecur(root.right, depth + 1, res);

  const val = root.val;
  if (res[depth]) {
    res[depth].push(val);
  } else {
    res[depth] = [val];
  }

  if (depth === 0) {
    for (let i = 0; i < res.length; i++) {
      if (i % 2 === 1) res[i].reverse();
    }
  }

  return res;
}
