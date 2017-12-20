import fs = require('fs');
import path = require('path');
import * as _ from 'lodash';

const lines = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').trim().split('\n');
const inputs = lines.map(l => l.split(' '));

const uniqueInputs = (input: string[][]): string[][] => {
  return input.filter(i => i.length === _.uniq(i).length);
};

const alphabetize = (input: string[][]): string[][] => {
  return input.map((phrase) => {
    return phrase.map(word => word.split('').sort().join());
  });
};

const part1 = uniqueInputs(inputs);
console.log(`Part 1: ${part1.length}`);

const part2 = uniqueInputs(alphabetize(part1));
console.log(`Part 2: ${part2.length}`);
