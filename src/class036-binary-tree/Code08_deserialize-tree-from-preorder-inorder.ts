// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const inorderValToIdxMap = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    inorderValToIdxMap.set(inorder[i], i);
  }

  return buildTreeRecur(
    preorder,
    0,
    preorder.length - 1,
    inorder,
    0,
    inorder.length - 1,
    inorderValToIdxMap,
  );
}

function buildTreeRecur(
  preorder: number[],
  p1: number,
  p2: number,
  inorder: number[],
  i1: number,
  i2: number,
  inorderValToIdxMap: Map<number, number>,
) {
  if (p1 > p2 || i1 > i2) return null;

  const head = new TreeNode(preorder[p1]);
  if (p1 === p2) return head;

  const idxInInorder = inorderValToIdxMap.get(head.val) as number;
  const step = idxInInorder - i1;
  head.left = buildTreeRecur(
    preorder,
    p1 + 1,
    p1 + step,
    inorder,
    i1,
    idxInInorder - 1,
    inorderValToIdxMap,
  );
  head.right = buildTreeRecur(
    preorder,
    p1 + step + 1,
    p2,
    inorder,
    idxInInorder + 1,
    i2,
    inorderValToIdxMap,
  );

  return head;
}

// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]
const tree = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.log('>>> tree', tree);
