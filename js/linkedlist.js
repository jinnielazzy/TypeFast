import Node from './node';

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insert(node) {
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
      this.curr = this.head;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.size++;
  }

  remove(node) {
    if (this.size === 0) {
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      this.head = node.next;
    } else if (node === this.tail) {
      this.tail = node.prev;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    this.size--;
  }

  reset() {
    this.curr = this.head;
  }

  hasNext() {
    return this.curr !== null;
  }

  next() {
    let node = this.curr;
    this.curr = node.next;
    return node;
  }
}

export default LinkedList;