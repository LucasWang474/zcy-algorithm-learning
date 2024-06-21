// https://leetcode.com/problems/all-oone-data-structure/
class AllOne {
  countList = new CountList();
  keyToCountNode = new Map<string, CountNode>();

  constructor() {}

  // inc(String key) Increments the count of the string key by 1.
  // If key does not exist in the data structure, insert it with count 1.
  inc(key: string): void {
    const oldCountNode = this.keyToCountNode.get(key);

    const plusOneCountNode = this.countList.getPlusOneCountNode(
      !oldCountNode ? this.countList.head : oldCountNode,
    );
    plusOneCountNode.stringSet.add(key);
    this.keyToCountNode.set(key, plusOneCountNode);

    if (oldCountNode) {
      oldCountNode.stringSet.delete(key);
      if (!oldCountNode.stringSet.size) {
        this.countList.deleteNode(oldCountNode);
      }
    }
  }

  // Decrements the count of the string key by 1.
  // If the count of key is 0 after the decrement, remove it from the data structure.
  // It is guaranteed that key exists in the data structure before the decrement.
  dec(key: string): void {
    const oldCountNode = this.keyToCountNode.get(key);
    if (!oldCountNode || oldCountNode?.count <= 0) return;

    const count = oldCountNode.count;
    if (count === 1) {
      // no more need to put key to lower CountNode
      this.keyToCountNode.delete(key);
    } else {
      const prevNode = this.countList.getMinusOneCountNode(oldCountNode);
      prevNode.stringSet.add(key);
      this.keyToCountNode.set(key, prevNode);
    }

    oldCountNode.stringSet.delete(key);
    if (!oldCountNode.stringSet.size) {
      this.countList.deleteNode(oldCountNode);
    }
  }

  getMaxKey(): string {
    return this.countList.tail.prev?.stringSet.values().next().value || '';
  }

  getMinKey(): string {
    return this.countList.head.next?.stringSet.values().next().value || '';
  }
}

class CountNode {
  // set for strings with this specific count
  stringSet = new Set<string>();
  count: number;
  next: CountNode | null = null;
  prev: CountNode | null = null;

  constructor(count: number) {
    this.count = count;
  }
}

class CountList {
  readonly head: CountNode;
  readonly tail: CountNode;

  constructor() {
    this.head = new CountNode(0);
    this.tail = new CountNode(Number.MAX_VALUE);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  deleteNode(node: CountNode) {
    if (node === this.head || node === this.tail) return;

    const prev = node.prev as CountNode;
    const next = node.next as CountNode;

    prev.next = next;
    next.prev = prev;

    node.prev = null;
    node.next = null;
  }

  getMinusOneCountNode(node: CountNode): CountNode {
    if (node === this.head) throw new Error('node can not be head');

    if (node.prev?.count === node.count - 1) {
      return node.prev;
    }

    const prev = node.prev as CountNode;
    const minusOneNode = new CountNode(node.count - 1);
    return this.insertNodeToNext(minusOneNode, prev);
  }

  getPlusOneCountNode(node: CountNode): CountNode {
    if (node === this.tail) throw new Error('node can not be tail');

    if (node.next?.count === node.count + 1) {
      return node.next;
    }

    const plusOneNode = new CountNode(node.count + 1);
    return this.insertNodeToNext(plusOneNode, node);
  }

  insertNodeToNext(newNode: CountNode, node: CountNode) {
    if (node === this.tail) throw new Error('node can not be tail');

    const next = node.next as CountNode;

    next.prev = newNode;
    newNode.next = next;

    node.next = newNode;
    newNode.prev = node;

    return newNode;
  }
}
