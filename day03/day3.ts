import * as _ from 'lodash';

const INPUT = 23;

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

const generate = (input) => {
  const nums = {};
  const arr = [[]];
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

const grid = generate(INPUT);

const part1 = Math.abs(grid[INPUT].x) + Math.abs(grid[INPUT].y);
console.log(`Part 1: ${part1}`);
