export class MyListNode<T> {
  val: T;
  next: MyListNode<T> | null = null;

  constructor(val: T) {
    this.val = val;
    this.next = null;
  }

  toCopy() {
    const res = new MyListNode<T>(this.val);
    let ptr = res;
    let head = this.next;
    while (head) {
      ptr.next = new MyListNode<T>(head.val);
      ptr = ptr.next;
      head = head.next;
    }
    return res;
  }

  toString() {
    let res = String(this.val);

    let head = this.next;
    while (head) {
      res += '->' + head.val;
      head = head.next;
    }

    return res;
  }

  toArray() {
    const res: T[] = [this.val];

    let head = this.next;
    while (head) {
      res.push(head.val);
      head = head.next;
    }

    return res;
  }
}
