import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const list: number[] = input.split('').map((n: string): number => parseInt(n, 10));

const part1 = list.reduce((acc, currentVal, index, array) => {
  if (currentVal === array[index - 1]) {
    return acc + currentVal;
  }
  
  return acc;
});

const part2 = (): number => {
  const halfLength = Math.floor(list.length / 2);
  const left = list.splice(0, halfLength);
  const right = list;
  let sum = 0;

  left.forEach((val, index) => {
    if (val === right[index]) {
      sum += val * 2;
    }
  });
  
  return sum;
};


console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2()}`);
