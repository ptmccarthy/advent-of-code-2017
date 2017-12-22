import fs = require('fs');
import path = require('path');
import * as _ from 'lodash';

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').trim().split('\n');

const wtRegEx = /\(([^)]+)\)/; // captures string in parenthesis

interface Node {
  id: string;
  weight: number;
  children: string[];
  parent: string;
}

interface NodeMap {
  [s: string]: Node;
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
      n.children = split[1].split(', ');
    } else {
      n.children = [];
    }

    map[n.id] = n;
  });

  Object.keys(map).forEach((key) => {
    const n = map[key];
    
    n.children.forEach((child) => {
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

const nodeMap = parseInput(input);
const root = findRoot(nodeMap);

console.log(`Part 1: Root Node is: ${root.id}`);
