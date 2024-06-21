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

// Post-order
function serialize(root: TreeNode | null): string {
  if (!root) return 'null';

  return `${serialize(root.left)},${serialize(root.right)},${root.val}`;
}

function deserialize(data: string): TreeNode | null {
  return deserializeRecur(data.split(',').reverse(), { idx: 0 });
}

function deserializeRecur(nodes: string[], idxInfo: { idx: number }) {
  const cur = nodes[idxInfo.idx++];

  if (cur === 'null') return null;

  const head = new TreeNode(+cur);
  head.right = deserializeRecur(nodes, idxInfo);
  head.left = deserializeRecur(nodes, idxInfo);

  return head;
}

const res = serialize(new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4))));
const res2 = deserialize(res);
// res null,null,2,null,null,4,null,3,1
console.log('>>> res', res);
console.log('>>> res2', res2);
