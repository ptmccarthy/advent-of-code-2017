import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').trim().split('\t');
const memory = input.map(n => parseInt(n, 10));
const configurations = [];

const redistribute = (memory: number[]): number[] => {
  const config = memory.slice();
  const maxIndex = findMaxIndex(config);
  const blocks = config[maxIndex];
  config[maxIndex] = 0;

  let cursor = maxIndex + 1;
  for (let i = blocks; i > 0; i--) {
    if (cursor >= config.length) { cursor = 0; }
    config[cursor]++;
    cursor++;
  }

  return config;
};

const findMaxIndex = (array: number[]) => {
  let maxValue = 0;
  let maxIndex: number;

  array.forEach((value, index) => {
    if (value > maxValue) {
      maxValue = value;
      maxIndex = index;
    }
  });

  return maxIndex;
};

const solvePart1 = (memory): number => {
  let mem = memory;
  let cycles = 0;

  while (1) {
    cycles++;
    mem = redistribute(mem);

    if (configurations.find(c => c === mem.toString())) {
      break;
    } else {
      configurations.push(mem.toString());
    }
  }

  return cycles;
};

console.log(`Part 1: ${solvePart1(memory)} cycles`);
