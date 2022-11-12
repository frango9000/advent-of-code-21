const testData = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

export function day11_1(data = testData): number {
  const matrix: { exhausted: boolean; energy: number }[][] = data
    .trim()
    .split('\n')
    .map((line) => line.split('').map((char) => ({ energy: Number.parseInt(char), exhausted: false })));

  let flashes = 0;
  for (let step = 0; step < 100; step++) {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        flashes += increaseEnergy(matrix, y, x);
      }
    }
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x].exhausted) {
          matrix[y][x].energy = 0;
          matrix[y][x].exhausted = false;
        }
      }
    }
  }

  return flashes;
}

export function day11_2(data = testData): number {
  const scores = data.trim().split('\n');

  return scores.length;
}

function increaseEnergy(matrix: { exhausted: boolean; energy: number }[][], y: number, x: number): number {
  const octopus = matrix[y] && matrix[y][x];
  if (octopus) {
    octopus.energy++;
    if (!octopus.exhausted && octopus.energy > 9) {
      octopus.exhausted = true;
      return (
        1 +
        increaseEnergy(matrix, y - 1, x - 1) +
        increaseEnergy(matrix, y - 1, x) +
        increaseEnergy(matrix, y - 1, x + 1) +
        increaseEnergy(matrix, y, x - 1) +
        increaseEnergy(matrix, y, x + 1) +
        increaseEnergy(matrix, y + 1, x - 1) +
        increaseEnergy(matrix, y + 1, x) +
        increaseEnergy(matrix, y + 1, x + 1)
      );
    }
  }
  return 0;
}
