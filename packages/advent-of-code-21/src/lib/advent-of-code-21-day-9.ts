export function isLinearLowpoint(prev: number, current: number, next: number): boolean {
  return (prev === undefined || prev > current) && (next === undefined || next > current);
}

export function day9_1(data = '2199943210\n3987894921\n9856789892\n8767896789\n9899965678\n'): number {
  const matrix: number[][] = data
    .trim()
    .split('\n')
    .map((line) => line.split('').map((char) => parseInt(char)));
  const lowpoints: number[] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (
        matrix[i][j] !== 9 &&
        isLinearLowpoint(matrix[i][j - 1], matrix[i][j], matrix[i][j + 1]) &&
        isLinearLowpoint(matrix[i - 1] && matrix[i - 1][j], matrix[i][j], matrix[i + 1] && matrix[i + 1][j])
      ) {
        lowpoints.push(matrix[i][j]);
      }
    }
  }

  return lowpoints.length + lowpoints.reduce((a, b) => a + b, 0);
}

export function day9_2(data = '2199943210\n3987894921\n9856789892\n8767896789\n9899965678\n'): number {
  const matrix: number[][] = data
    .trim()
    .split('\n')
    .map((line) => line.split('').map((char) => parseInt(char)));
  const clusterSizes: number[] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (
        matrix[i][j] !== 9 &&
        isLinearLowpoint(matrix[i][j - 1], matrix[i][j], matrix[i][j + 1]) &&
        isLinearLowpoint(matrix[i - 1] && matrix[i - 1][j], matrix[i][j], matrix[i + 1] && matrix[i + 1][j])
      ) {
        clusterSizes.push(getBasinSize(matrix, i, j));
      }
    }
  }

  return clusterSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1);
}

function getBasinSize(matrix: number[][], i: number, j: number): number {
  if (!matrix[i] || matrix[i][j] === undefined || matrix[i][j] === 9) {
    return 0;
  }
  matrix[i][j] = 9;
  return (
    1 +
    getBasinSize(matrix, i - 1, j) +
    getBasinSize(matrix, i + 1, j) +
    getBasinSize(matrix, i, j - 1) +
    getBasinSize(matrix, i, j + 1)
  );
}
