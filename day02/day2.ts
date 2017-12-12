import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').trim();
const rows: number[][] = input.split('\n').map(r => r.split('\t').map(s => parseInt(s, 10)));

const rowMinMax = (row: number[]): number => {
  let min = row[0]; let max = 0;

  row.forEach((n) => {
    if (n < min) {
      min = n;
    }
    if (n > max) {
      max = n;
    }
  });

  return max - min;
};

const rowDivide = (row: number[]): number => {
  let b; let s;

  row.forEach((big) => {
    row.forEach((small) => {
      if (big > small && big % small === 0) {
        b = big;
        s = small;
      }
    });
  });

  return b / s;
};

const checksum1 = (rows: number[][]): number => {
  const sums = rows.map(r => rowMinMax(r));
  return sums.reduce((acc, cv) => acc + cv);
};

const checksum2 = (rows: number[][]): number => {
  const divs = rows.map(r => rowDivide(r));
  return divs.reduce((acc, cv) => acc + cv);
};

console.log(`Part 1: ${checksum1(rows)}`);
console.log(`Part 2: ${checksum2(rows)}`);
