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

function widthOfBinaryTreeRecur(root: TreeNode | null): number {
  if (!root) return 0;

  let maxWidth = 1;

  function dfs(cur: TreeNode | null, depth: number, startIndices: number[], curIndex: number) {
    if (!cur) return;

    if (!startIndices[depth]) startIndices[depth] = curIndex;

    const curWidth = curIndex - startIndices[depth] + 1;
    maxWidth = Math.max(maxWidth, curWidth);

    dfs(cur.left, depth + 1, startIndices, curWidth * 2);
    dfs(cur.right, depth + 1, startIndices, curWidth * 2 + 1);
  }

  dfs(root, 0, [1], 1);
  return maxWidth;
}
