class Node {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = buildTree();
    }
}

function buildTree(array) {
    // Sort array and convert to set
    let a = array.sort();
    let s = new Set(a);

    console.log(s);
}

buildTree([1,7,4,5,3,9,7,4]);