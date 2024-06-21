// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/

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

function serialize(root: TreeNode | null): string {
  if (!root) return 'null';

  return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
}

function deserialize(data: string): TreeNode | null {
  return deserializeRecur(data.split(','), { idx: 0 });
}

function deserializeRecur(nodes: string[], idxInfo: { idx: number }) {
  const cur = nodes[idxInfo.idx++];

  if (cur === 'null') return null;

  const head = new TreeNode(+cur);
  head.left = deserializeRecur(nodes, idxInfo);
  head.right = deserializeRecur(nodes, idxInfo);

  return head;
}

const res = serialize(new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4))));
const res2 = deserialize(res);
// 1,2,null,null,3,4,null,null,null
console.log('>>> res', res);
console.log('>>> res2', res2);
