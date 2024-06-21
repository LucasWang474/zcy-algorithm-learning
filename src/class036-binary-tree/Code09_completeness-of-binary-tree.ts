// https://leetcode.com/problems/check-completeness-of-a-binary-tree/description/

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

function isCompleteTree(root: TreeNode | null): boolean {
  if (!root) return true;

  let curLevel = [root];
  let mustAllLeaf = false;

  while (curLevel.length) {
    const nextLevel = [];

    for (const node of curLevel) {
      if (!node.left && node.right) return false;
      if (mustAllLeaf && (node.left || node.right)) return false;

      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);

      if (!node.left || !node.right) mustAllLeaf = true;
    }

    curLevel = nextLevel;
  }

  return true;
}

//     1
//   2   _
//  4 _ _ _
const res = isCompleteTree(new TreeNode(1, new TreeNode(2, new TreeNode(4))));
console.log('>>> res', res);
