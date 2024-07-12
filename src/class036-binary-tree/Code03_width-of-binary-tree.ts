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

function widthOfBinaryTree(root: TreeNode | null): number {
  return widthOfBinaryTreeRecur(root);
}

function widthOfBinaryTreeIter(root: TreeNode | null): number {
  if (!root) return 0;

  let maxRes = 0;
  let curLevel: [TreeNode, number][] = [[root, 1]];

  while (curLevel.length) {
    const nextLevel: [TreeNode, number][] = [];
    maxRes = Math.max(maxRes, curLevel[curLevel.length - 1][1] - curLevel[0][1] + 1);

    const idxBase = curLevel[0][1];

    for (const [node, idx] of curLevel) {
      if (node.left) {
        nextLevel.push([node.left, (idx - idxBase) * 2]);
      }
      if (node.right) {
        nextLevel.push([node.right, (idx - idxBase) * 2 + 1]);
      }
    }

    curLevel = nextLevel;
  }

  return maxRes;
}

function widthOfBinaryTreeRecur(
  root: TreeNode | null,
  startIndices: number[],
  depth: number,
  idx: number,
) {
  if (!root) return 0;

  if (startIndices[depth] === undefined) {
    startIndices[depth] = idx;
  }

  return Math.max(
    1,
    idx - startIndices[depth] + 1,
    widthOfBinaryTreeRecur(root.left, startIndices, depth + 1, (idx - startIndices[depth]) * 2 + 1),
    widthOfBinaryTreeRecur(
      root.right,
      startIndices,
      depth + 1,
      (idx - startIndices[depth]) * 2 + 2,
    ),
  );
}
