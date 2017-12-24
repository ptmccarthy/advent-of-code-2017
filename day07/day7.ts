import fs = require('fs');
import path = require('path');
import * as _ from 'lodash';

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').trim().split('\n');

const wtRegEx = /\(([^)]+)\)/; // captures string in parenthesis

interface NodeMap {
  [s: string]: Node;
}

interface Node {
  id: string;
  weight: number;
  childIds: string[];
  children: Node[];
  weightOfChildren: number;
  parent: string;
}

const parseInput = (input: string[]): NodeMap => {
  const map = {};

  input.forEach((i: string) => {
    const n = <Node>{};
    const split = i.split(' -> ');
    const parent = split[0];

    n.id = parent.split(' ')[0];
    n.weight = parseInt(wtRegEx.exec(parent)[1], 10);

    if (split[1]) {
      n.childIds = split[1].split(', ');
    } else {
      n.childIds = [];
    }

    map[n.id] = n;
  });

  Object.keys(map).forEach((key) => {
    const n = map[key];
    
    n.childIds.forEach((child) => {
      map[child].parent = key;
    });
  });

  return map;
};

const findRoot = (nodeMap: NodeMap): Node | null => {
  let root;
  Object.keys(nodeMap).forEach((key) => {
    if (!nodeMap[key].parent) {
      root = nodeMap[key];
    }
  });

  return root;
};

const buildTree = (nodeMap: NodeMap, root: Node) => {
  const tree = { ...root };
  populateChildren(nodeMap, tree);
  return tree;
};

const populateChildren = (nodeMap: NodeMap, node): Node => {
  node.children = [];
  node.childIds.forEach((child, index) => {
    node.children[index] = nodeMap[child];
    populateChildren(nodeMap, node.children[index]);
  });
  return node;
};

const weighTree = (tree: Node) => {
  tree.weightOfChildren = 0;
  tree.children.forEach((child) => {
    tree.weightOfChildren += weighTree(child);
  });

  return tree.weight + tree.weightOfChildren;
};

const findImbalance = (tree: Node) => {
  const children = _.groupBy(tree.children, c => c.weight + c.weightOfChildren);
  const childKeys = Object.keys(children);

  if (childKeys.length === 1) {
    return;
  }

  console.log(`${tree.id} has imbalanced children`);

  const imbalancedChild = _.find(children, c => c.length === 1)[0];
  const balancedChildren = _.find(children, c => c.length > 1);
  const expectedWeight = balancedChildren[0].weight + balancedChildren[0].weightOfChildren;
  const incorrectWeight = imbalancedChild.weight + imbalancedChild.weightOfChildren;
  const correction = expectedWeight - incorrectWeight;

  console.log(`the imbalanced child is ${imbalancedChild.id} with weight ${imbalancedChild.weight}`);
  console.log(`imbalanced weight: ${incorrectWeight}`);
  console.log(`correction: ${correction}`);
  console.log(`result: ${imbalancedChild.weight + correction}`);    

  tree.children.forEach(c => findImbalance(c));
};

const nodeMap = parseInput(input);
const root = findRoot(nodeMap);

console.log(`Part 1: Root Node is: ${root.id}`);

const tree = buildTree(nodeMap, root);
weighTree(tree);
findImbalance(tree);
