import fs = require('fs');
import path = require('path');
import * as _ from 'lodash';

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').trim().split('\n');
const offsets = input.map(i => parseInt(i, 10));

const runInstructions = (offsets: number[]) => {
  const length = offsets.length;
  let cursor = 0;
  let jumps = 0;

  while (cursor < length) {
    const jump = offsets[cursor];
    offsets[cursor] += 1;
    cursor += jump;
    jumps += 1;
  }

  return jumps;
};

const part1 = runInstructions(offsets);
console.log(`Part 1: ${part1}`);
