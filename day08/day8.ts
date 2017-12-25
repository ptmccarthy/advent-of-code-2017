import fs = require('fs');
import path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').trim().split('\n');

const parseInstruction = (regs, instruction: string): number => {
  const split = instruction.split(' ');

  const register = split[0];
  const operation = split[1];
  const amount = parseInt(split[2], 10);
  const comparisonRegister = split[4];
  const comparisonOperator = split[5];
  const comparisonAmount = parseInt(split[6], 10);
  let lastModified;

  if (!regs[comparisonRegister]) {
    regs[comparisonRegister] = 0;
  }

  switch (comparisonOperator) {
    case '<':
      if (regs[comparisonRegister] < comparisonAmount) {
        lastModified = modifyRegister(regs, register, operation, amount);
      }
      break;
    case '>':
      if (regs[comparisonRegister] > comparisonAmount) {
        lastModified = modifyRegister(regs, register, operation, amount);
      }
      break;
    case '==':
      if (regs[comparisonRegister] === comparisonAmount) {
        lastModified = modifyRegister(regs, register, operation, amount);
      }
      break;
    case '>=':
      if (regs[comparisonRegister] >= comparisonAmount) {
        lastModified = modifyRegister(regs, register, operation, amount);
      }
      break;
    case '<=':
      if (regs[comparisonRegister] <= comparisonAmount) {
        lastModified = modifyRegister(regs, register, operation, amount);
      }
      break;
    case '!=':
      if (regs[comparisonRegister] !== comparisonAmount) {
        lastModified = modifyRegister(regs, register, operation, amount);
      }
      break;
  }

  return lastModified;
};

const modifyRegister = (registers, register, operation, amount): number => {
  if (!registers[register]) {
    registers[register] = 0;
  }
  
  switch (operation) {
    case 'inc':
      registers[register] += amount;
      break;
    case 'dec':
      registers[register] -= amount;
      break;
  }

  return registers[register];
};

const largestRegister = (registers): number => {
  const regs = Object.keys(registers);
  
  let max = registers[regs[0]]; // theoretically could be negative, so start with the first value instead of 0

  regs.forEach((r) => {    
    if (registers[r] > max) {
      max = registers[r];
    }
  });

  return max;
};


const registers = {};
let highestValue = 0;

input.forEach((i) => {  
  const lastModified = parseInstruction(registers, i);

  if (lastModified > highestValue) {
    highestValue = lastModified;
  }
});

console.log(`Part 1: Largest register value: ${largestRegister(registers)}`);
console.log(`Part 2: Highest value ever seen: ${highestValue}`);
