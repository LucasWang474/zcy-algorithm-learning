// https://leetcode.com/problems/path-sum-ii/

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

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  if (!root) return [];

  const res: number[][] = [];
  pathSumRecur(root, targetSum, [], res);
  return res;
}

function pathSumRecur(root: TreeNode, curTarget: number, curPath: number[], res: number[][]) {
  if (!root.left && !root.right) {
    if (curTarget !== root.val) return;

    res.push([...curPath, curTarget]);
    return;
  }

  curPath.push(root.val);
  if (root.left) pathSumRecur(root.left, curTarget - root.val, curPath, res);
  if (root.right) pathSumRecur(root.right, curTarget - root.val, curPath, res);
  curPath.pop();
}
