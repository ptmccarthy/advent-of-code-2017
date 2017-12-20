import fs = require('fs');
import path = require('path');
import * as _ from 'lodash';

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').trim().split('\n');
const offsets = input.map(i => parseInt(i, 10));

const runInstructionsPart1 = (offsets: number[]) => {
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

const runInstructionsPart2 = (offsets: number[]) => {
  const length = offsets.length;
  let cursor = 0;
  let jumps = 0;

  while (cursor < length) {
    const jump = offsets[cursor];
    
    if (jump < 3) {
      offsets[cursor] += 1;
    } else {
      offsets[cursor] -= 1;
    }

    cursor += jump;
    jumps += 1;
  }

  return jumps;
};

const part1 = runInstructionsPart1(_.cloneDeep(offsets));
console.log(`Part 1: ${part1}`);

const part2 = runInstructionsPart2(_.cloneDeep(offsets));
console.log(`Part 2: ${part2}`);
