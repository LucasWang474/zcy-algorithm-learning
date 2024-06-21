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

// level-order
function serialize(root: TreeNode | null): string {
  if (!root) return 'null';

  let curLevel = [root],
    nextLevel;
  let res = `${root.val}`;
  while (curLevel.length) {
    nextLevel = [];

    for (const node of curLevel) {
      if (node.left) nextLevel.push(node.left);
      res += `,${generateStrFromNode(node.left)}`;

      if (node.right) nextLevel.push(node.right);
      res += `,${generateStrFromNode(node.right)}`;
    }

    curLevel = nextLevel;
  }

  return res;
}

function deserialize(data: string): TreeNode | null {
  if (!data || data === 'null') return null;

  const vals = data.split(',');
  let i = 0;
  const root = new TreeNode(+vals[i++]);

  let curLevel = [root],
    nextLevel;
  while (curLevel.length) {
    nextLevel = [];

    for (const node of curLevel) {
      node.left = generateNodeFromStr(vals[i++]);
      node.right = generateNodeFromStr(vals[i++]);

      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }

    curLevel = nextLevel;
  }

  return root;
}

function generateStrFromNode(node: TreeNode | null) {
  return node ? String(node.val) : 'null';
}

function generateNodeFromStr(s: string) {
  return s === 'null' ? null : new TreeNode(+s);
}

const res1 = serialize(new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4))));
const res2 = deserialize(res1);
// res 1,2,3,null,null,4,null,null,null
console.log('>>> res', res1);
console.log('>>> res2', res2);
