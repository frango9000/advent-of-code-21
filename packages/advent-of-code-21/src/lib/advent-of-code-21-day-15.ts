import { StopWatch } from './stopwatch';

export const testData0 = `
11
13
`; //4

export const testData1 = `
116
138
213
`; //7

export const testData2 = `
1163
1381
2136
3694
`; //17

export const testData3 = `
11637
13813
21365
36949
74634
`; //24

export const testData4 = `
116375
138137
213651
369493
746341
131912
`; //25

export const testData5 = `
1163751
1381373
2136511
3694931
7463417
1319128
1359912
`; //28

export const testData6 = `
11637517
13813736
21365113
36949315
74634171
13191281
13599124
31254216
`; //35

export const testData7 = `
116375174
138137367
213651132
369493156
746341711
131912813
135991242
312542163
129313852
`; //38

export const testData8 = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`; //40

export function day15_1(data = testData1): number {
  const map: number[][] = data
    .trim()
    .split('\n')
    .map((line) => line.split('').map((char) => parseInt(char, 10)));

  const topRoute =
    map[0].reduce((acc, val) => {
      return acc + val;
    }) +
    map
      .map((row) => row[row.length - 1])
      .reduce((acc, val) => {
        return acc + val;
      });
  -map[0][map[0].length - 1];

  const bottomRoute =
    map.reduce((acc, row) => {
      return acc + row[0];
    }, 0) +
    map[map.length - 1].reduce((acc, val) => {
      return acc + val;
    }, 0);
  -map[map.length - 1][0];

  const sw = new StopWatch();

  const lowestPathSum2 = findCheapestPath(map, Math.min(topRoute, bottomRoute)) - map[0][0];

  sw.stopAndLog();
  return lowestPathSum2;
}

export function day15_2(data = testData1): number {
  return 0;
}

interface Coordinate {
  x: number;
  y: number;
}

function findCheapestPath(
  map: number[][],
  minFound: number = Number.MAX_SAFE_INTEGER,
  currentSum = 0,
  target: Coordinate = { y: map.length - 1, x: map[0].length - 1 },
  path: Coordinate[] = [{ y: 0, x: 0 }]
): number {
  const current = path[path.length - 1];
  currentSum += map[current.y][current.x];
  if (currentSum >= minFound) {
    return minFound;
  }
  if (current && current.x === target.x && current.y === target.y) {
    return currentSum;
  }

  const posiblePaths = [
    // { y: current.y - 1, x: current.x },
    { y: current.y + 1, x: current.x },
    // { y: current.y, x: current.x - 1 },
    { y: current.y, x: current.x + 1 },
  ]
    .filter((c) => c.x >= 0 && c.y >= 0 && c.x < map[0].length && c.y < map.length)
    .filter((c) => !path.some((p) => p.x === c.x && p.y === c.y))
    .filter(
      (c) =>
        !path.slice(0, -1).some(
          (p) =>
            (p.x + 1 === c.x && p.y === c.y) ||
            // (p.x - 1 === c.x && p.y === c.y) ||
            (p.x === c.x && p.y + 1 === c.y)
          // || (p.x === c.x && p.y - 1 === c.y)
        )
    );
  for (const posiblePath of posiblePaths) {
    minFound = Math.min(minFound, findCheapestPath(map, minFound, currentSum, target, [...path, posiblePath]));
  }
  return minFound;
}
