class LRUCache {
  private doubleList: DoubleList = new DoubleList();
  private keyToNode: Map<number, DoubleNode> = new Map();
  private readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    const node = this.keyToNode.get(key);
    if (!node) return -1;

    this.doubleList.moveToTail(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const existed = this.keyToNode.has(key);

    if (existed) {
      const node = this.keyToNode.get(key) as DoubleNode;
      node.value = value;
      this.doubleList.moveToTail(node);
      return;
    }

    if (this.capacity <= this.keyToNode.size) {
      const leastUsedNode = this.doubleList.head as DoubleNode;
      this.keyToNode.delete(leastUsedNode.key);
      this.doubleList.removeHead();
    }

    const newNode = new DoubleNode(key, value);
    this.keyToNode.set(key, newNode);
    this.doubleList.addToTail(newNode);
  }
}

class DoubleNode {
  public key;
  public value;
  public next?: DoubleNode | null;
  public prev?: DoubleNode | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}

class DoubleList {
  public head: DoubleNode | null = null;
  public tail: DoubleNode | null = null;

  constructor() {}

  moveToTail(node: DoubleNode) {
    if (!node) return;
    if (!this.tail || !this.head) return;
    if (node === this.tail) return;

    const next = node.next as DoubleNode;
    next.prev = node.prev;
    if (node.prev) {
      node.prev.next = next;
    } else {
      this.head = next;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  removeHead() {
    if (!this.head) return;
    if (this.head === this.tail) {
      this.head = this.tail = null;
      return;
    }

    const next = this.head.next as DoubleNode;
    next.prev = null;
    this.head.next = null;
    this.head = next;
  }

  addToTail(node: DoubleNode) {
    if (!this.tail || !this.head) {
      this.head = this.tail = node;
      node.prev = null;
      node.next = null;
      return;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
}
