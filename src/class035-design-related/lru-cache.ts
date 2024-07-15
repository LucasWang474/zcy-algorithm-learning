class LRUCache {
  list = new DoubleList();
  keyToNodeMap: Map<number, DoubleNode> = new Map();
  capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    if (!this.keyToNodeMap.has(key)) return -1;

    const node = this.keyToNodeMap.get(key) as DoubleNode;
    const val = node.val;
    this.list.moveToEnd(node);
    return val;
  }

  put(key: number, value: number): void {
    let node = this.keyToNodeMap.get(key);
    if (node) {
      node.val = value;
      this.list.moveToEnd(node);
    } else {
      node = new DoubleNode(key, value);
      this.keyToNodeMap.set(key, node);
      this.list.insertToEnd(node);

      if (this.keyToNodeMap.size > this.capacity) {
        const oldNode = this.list.head.next as DoubleNode;
        this.keyToNodeMap.delete(oldNode.key);
        this.list.delete(oldNode);
      }
    }
  }
}

class DoubleList {
  head: DoubleNode;
  tail: DoubleNode;

  constructor() {
    this.head = new DoubleNode(Infinity, Infinity);
    this.tail = new DoubleNode(Infinity, Infinity);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  delete(node: DoubleNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;

    node.next = null;
    node.prev = null;
  }

  insertToEnd(node: DoubleNode) {
    const tailPrev = this.tail.prev;

    tailPrev!.next = node;
    node.next = this.tail;

    this.tail.prev = node;
    node.prev = tailPrev;
  }

  moveToEnd(node: DoubleNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    node.next = null;
    node.prev = null;

    this.insertToEnd(node);
  }
}

class DoubleNode {
  key: number;
  val: number;
  next?: DoubleNode | null;
  prev?: DoubleNode | null;

  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}
