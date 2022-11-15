export const testData1 = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

interface Point {
  x: number;
  y: number;
}

interface FoldAction {
  magnitude: number;
  axis: string;
}

export function day13_1(data = testData1): number {
  const [rawPoints, rawActions]: string[] = data.trim().split('\n\n');
  const points: Point[] = rawPoints.split('\n').map((point) => {
    const [x, y] = point.split(',').map((coord) => parseInt(coord, 10));
    return { x, y };
  });

  const actions: FoldAction[] = rawActions.split('\n').map((point) => {
    const [axis, magnitude] = point.slice(11).split('=');
    return { axis, magnitude: parseInt(magnitude) };
  });

  const [base, fold] = foldMatrix(points, (point) =>
    point[actions[0].axis] < actions[0].magnitude ? -1 : point[actions[0].axis] > actions[0].magnitude ? 1 : 0
  );

  const foldReflection = reflectMatrix(fold, actions[0]);

  const folded = mergeMatrix(base, foldReflection);

  return folded.length;
}

export function day13_2(data = testData1): number {
  const [rawPoints, rawActions]: string[] = data.trim().split('\n\n');
  let points: Point[] = rawPoints.split('\n').map((point) => {
    const [x, y] = point.split(',').map((coord) => parseInt(coord, 10));
    return { x, y };
  });

  const actions: FoldAction[] = rawActions.split('\n').map((point) => {
    const [axis, magnitude] = point.slice(11).split('=');
    return { axis, magnitude: parseInt(magnitude) };
  });

  for (const action of actions) {
    const [base, fold] = foldMatrix(points, (point) =>
      point[action.axis] > action.magnitude ? -1 : point[action.axis] < action.magnitude ? 1 : 0
    );

    const foldReflection = reflectMatrix(fold, action);

    points = mergeMatrix(base, foldReflection);
  }
  printMatrix(points);
  return points.length;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function partition<T>(array: T[], isValid: (elem: T) => boolean): [T[], T[]] {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}

function foldMatrix<T>(array: T[], getSide: (elem: T) => number): [T[], T[]] {
  return array.reduce(
    ([side1, side2], elem) => {
      const side = getSide(elem);
      return side === 0 ? [side1, side2] : side > 0 ? [[...side1, elem], side2] : [side1, [...side2, elem]];
    },
    [[], []]
  );
}

function reflectMatrix(fold: Point[], action: FoldAction): Point[] {
  return fold.map((point) => {
    return {
      x: action.axis === 'x' ? point.x - 2 * (point.x - action.magnitude) : point.x,
      y: action.axis === 'y' ? point.y - 2 * (point.y - action.magnitude) : point.y,
    };
  });
}

function mergeMatrix(base: Point[], foldReflection: Point[]): Point[] {
  return base.concat(
    foldReflection.filter((point) => !base.some((basePoint) => point.x === basePoint.x && point.y === basePoint.y))
  );
}

function printMatrix(points: Point[]) {
  const maxX = Math.max(...points.map((point) => point.x));
  const maxY = Math.max(...points.map((point) => point.y));

  const matrix = Array.from({ length: maxY + 1 }).map(() => Array.from({ length: maxX + 1 }).fill('.'));

  for (const point of points) {
    matrix[point.y][point.x] = '#';
  }

  console.log(matrix.map((row) => row.join('')).join('\n'));
}
