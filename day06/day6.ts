import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').trim().split('\t');
const memory = input.map(n => parseInt(n, 10));

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

const redistributeLoop = (memory, inclusive = true) => {
  let mem = memory;
  let cycles = 0;
  const configurations = [];

  while (1) {
    cycles++;
    mem = redistribute(mem);

    if (configurations.find(c => c === mem.toString())) {      
      configurations.push(mem.toString());
      break;
    } else {
      configurations.push(mem.toString());
    }
  }

  // if counting the size of the loop, don't include the last cycle in the count
  if (!inclusive) { cycles--; }
  return { cycles, mem };
};

const part1 = redistributeLoop(memory, true);
console.log(`Part 1: ${part1.cycles} cycles`);

const part2 = redistributeLoop(part1.mem, false);
console.log(`Part 2: ${part2.cycles} cycles`);
