import { Tree, prettyPrint, isBalanced, rebalance, levelOrderForEach, preOrderForEach, postOrderForEach, inOrderForEach, insert } from '/bST.js';

function randomArray(number) {
    let arr = new Set([]);
    while (arr.size < number) {
        let x = Math.round(Math.random() * 100);
        arr.add(x);
    }
    let newArr = Array.from(arr);
    return newArr;
}

let newTree = new Tree(randomArray(10));

levelOrderForEach(console.log, newTree.root);
preOrderForEach(console.log, newTree.root);
postOrderForEach(console.log, newTree.root);
inOrderForEach(console.log, newTree.root);
insert(newTree.root, 105);
insert(newTree.root, 115);
insert(newTree.root, 150);
insert(newTree.root, 102);
insert(newTree.root, 175);
if (!isBalanced(newTree.root)) {
    console.log(false);
} else {
    console.log(true);
}
prettyPrint(newTree.root);
rebalance(newTree.root);
levelOrderForEach(console.log, newTree.root);
preOrderForEach(console.log, newTree.root);
postOrderForEach(console.log, newTree.root);
inOrderForEach(console.log, newTree.root);


