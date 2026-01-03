class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};

export class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
};

export function sortData(array) {
    // remove duplicates
    let oneOnly = new Set(array);
    // sort array
    let sorted = Array.from(oneOnly);
    return sorted.sort((a, b) => a - b);
};

export function buildTree(array) {
    // sort array
    let sortedArray = sortData(array);

    let start = 0;
    let end = array.length - 1;
    
    // Recursive function
    let x = recursionFindRoot(sortedArray, start, end);
    return x;
};

export function recursionFindRoot(array, start, end) {

    if (start > end) {
        return null;
    }
    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);
    root.left = recursionFindRoot(array, start, mid-1);
    root.right = recursionFindRoot(array, mid+1, end);

    return root;
};

export function insert(tree, data) {   
    // Go Left
    if (data < tree.data) {
        if (tree.left == null) {
            let newNode = new Node(data);
            return tree.left = newNode;
        } else {
            insert(tree.left, data);
        }
    // Go Right
    } else if (data > tree.data){
        if (tree.right == null) {
           let newNode = new Node(data);
            return tree.right = newNode; 
        } else {
            insert(tree.right, data);
        }
    }
};

export function deleteItem(tree, data) {
    let parent;
    let current = tree.root;
    
    // Find node
    while (current != null && current.data != data) {
        if (current.data > data) {
            parent = current;
            current = current.left;
        } else if (current.data < data) {
            parent = current;
            current = current.right;
        }
    }   console.log({parent, current});

    if (current === null) {
        console.log("Node with data " + data + " not found.");
        return;
    };

    // Leaf Node
    if (current.left == null && current.right == null) {
        if (current.data < parent.data) {
            return parent.left = null
        } else {
            return parent.right = null;
        } 
    };
    // 1 child
    if (current.left === null || current.right === null) { 
        if (current.data < parent.data) {
            if (current.left === null) {
                parent.left = current.right;
            } else {
                parent.left = current.left;
            }
        } else if (current.data > parent.data) {
            if (current.left === null) {
                parent.right = current.right;
            } else {
                parent.right = current.left;
            }
        } 
    };

    // 2 children
    if (current.left != null && current.right != null) {
        let x = current.right;
        let a = findNode(x);
        if (a.data > parent.data) {
            parent.right = a;
            a.left = current.left;            
        } else if (a.data < parent.data) {
            parent.left = a;
            a.left = current.left;
        }
    }
};

export function findNode(x) {    
    let parent = x;
    if (x.left != null) {
        parent = x;
        return findNode(x.left);
    } else {
        return parent;
    }
};

export function findValue(tree, value) {
    if (tree === null) {
        console.log("Not Found");
        return null;
    }
    if (tree.data == value) {
        return tree;
    } else if (tree.data > value) {
        return findValue(tree.left, value);
    } else if (tree.data < value) {
        return findValue(tree.right, value);
    } else {
        console.log("Not Found");
    }
};

export function levelOrderForEach(callback, root) {
    if (!callback) {
        throw new Error("Callback required");
    };
    let queue = [];
    let nodes = [];
    // Start with known node
    if (root != null) {
        queue.push(root);
    };    

    // Add all nodes
    while (queue.length > 0) {
        let x = queue.shift();
        nodes.push(x.data);
        if (x.left != null) {
            queue.push(x.left);
        } 
        if (x.right != null) {
            queue.push(x.right);
        }
    } 
    callback(nodes); 
};

export function preOrderForEach(callback, root) {
   if (!callback) {
        throw new Error("Callback required");
    };

    let queue = [];

    function traversal(root) {
        if (root === null) {
            return
        } else {
            queue.push(root.data);
            traversal(root.left);
            traversal(root.right);
        }
    };
    traversal(root);
    callback(queue);
};

export function inOrderForEach(callback, root) {
    if (!callback) {
        throw new Error("Callback required");
    };

    let queue = [];
    function traversal(root) {
             if (root === null) {
            return
        } else {
            traversal(root.left);
            queue.push(root.data);
            traversal(root.right);
        }
    };
    traversal(root);
    callback(queue);
};

export function postOrderForEach(callback, root) {
     if (!callback) {
        throw new Error("Callback required");
    };

    let queue = [];
    function traversal(root) {
             if (root == null) {
            return
        } else {
            traversal(root.left);
            traversal(root.right);
            queue.push(root.data);
        }
    };
    traversal(root);
    callback(queue);
};

export function depth(value, root) {
    let i = 0;
    let x = root;
    
    function findDepth(value, x) { 
        if (x == null) {
            return;
        }       
       // start at first level
        if (x.data == value) {
        return;
    } else if (x.data > value) {
        x = x.left;
        i++;
        return findDepth(value, x);
    } else {
        x = x.right;
        i++;
        return findDepth(value, x);
        };
    }
    findDepth(value, root);
    return i;
};

function findMaxDepth(x) {
    if(x === null) {
        return -1;
    }

    let leftHeight = findMaxDepth(x.left);
    let rightHeight = findMaxDepth(x.right);

    return Math.max(leftHeight, rightHeight) + 1; 
}

export function height(value, root) {
    let x = findValue(root, value); 

    return findMaxDepth(x);    
};

export function isBalanced(root) {
    if (root === null) {
        return true;
    }   
    // Get height of node Left and Right
    let lHeight = findMaxDepth(root.left);    
    let rHeight = findMaxDepth(root.right);
    
    // Compare sides
     if (Math.abs(lHeight - rHeight) > 1) {
        return false;
    }
    
    // Check each node
    return isBalanced(root.left) && isBalanced(root.right);
};

export function rebalance(root) {
    // Gather all node data in an array
    let newArray = []
    function traversal(root) {
        if (root === null) {
            return
        } else {
            newArray.push(root.data);
            traversal(root.left);
            traversal(root.right);
        }
    };
    traversal(root);
    // Build tree
    root = buildTree(newArray);
    prettyPrint(root);
}
  
export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


