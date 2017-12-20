import * as _ from 'lodash';

const INPUT = 325489;

interface Axis {
  idx: number;
  pos: boolean;
  count: number;
  nextCount: number;
  hasNext: boolean;
}

const moveAxes = (axis: Axis, other: Axis) => {
  if (axis.pos) {
    axis.idx++;
  } else {
    axis.idx--;
  }

  axis.count -= 1;
  axis.hasNext = (axis.count > 0);

  if (!axis.hasNext) {
    axis.pos = !axis.pos;
    axis.count = axis.nextCount;
    axis.nextCount++;
  }

  other.hasNext = !axis.hasNext;
};

const generatePart1 = (input) => {
  const nums = {};
  const x: Axis = {
    idx: 0,
    pos: true,
    count: 1,
    nextCount: 2,
    hasNext: true,
  };

  const y: Axis = {
    idx: 0,
    pos: true,
    count: 1,
    nextCount: 2,
    hasNext: false,
  };

  for (let i = 1; i <= input; i++) {
    nums[i] = { x: x.idx, y: y.idx };

    if (x.hasNext) {
      moveAxes(x, y);
    } else {
      moveAxes(y, x);
    }
  }

  return nums;
};

const findPart2 = (input, grid) => {
  grid[1].adjVal = 1;
  
  for (let i = 2; i <= input; i++) {
    const x = grid[i].x;
    const y = grid[i].y;

    const adjacents = _.filter(grid, (p) => {
      const adjX = [x - 1, x, x + 1];
      const adjY = [y - 1, y, y + 1];
      
      if (adjX.indexOf(p.x) >= 0 && adjY.indexOf(p.y) >= 0) {
        if (p.adjVal) {
          return p;
        }
      }
    });
  
    let adjSum = 0;
    adjacents.forEach((adj: any) => { adjSum += adj.adjVal; });
    grid[i].adjVal = adjSum;

    if (grid[i].adjVal > input) {
      return grid[i].adjVal;
    }
  }

  return grid;
};

const grid = generatePart1(INPUT);
const part1 = Math.abs(grid[INPUT].x) + Math.abs(grid[INPUT].y);
console.log(`Part 1: ${part1}`);

const part2 = findPart2(INPUT, grid);
console.log(`Part 2: ${part2}`);
