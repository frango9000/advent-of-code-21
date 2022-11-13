export const testData1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;
export const testData2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

export const testData3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;

export function day12_1(data = testData1): number {
  const connections: string[] = data.trim().split('\n');
  const caves = new Map<string, Cave>();

  for (const connection of connections) {
    const [from, to] = connection.split('-');
    const fromCave = caves.get(from) || new Cave(from);
    const toCave = caves.get(to) || new Cave(to);
    Cave.connect(fromCave, toCave);
    caves.set(from, fromCave);
    caves.set(to, toCave);
  }

  return caves.get('start').findPathsTo('end').length;
}

export function day12_2(data = testData1): number {
  const connections: string[] = data.trim().split('\n');
  const caves = new Map<string, Cave>();

  for (const connection of connections) {
    const [from, to] = connection.split('-');
    const fromCave = caves.get(from) || new Cave(from);
    const toCave = caves.get(to) || new Cave(to);
    Cave.connect(fromCave, toCave);
    caves.set(from, fromCave);
    caves.set(to, toCave);
  }

  return caves.get('start').findPathsTo2('start', 'end').length;
}

class Cave {
  public static connect(cave1: Cave, cave2: Cave) {
    cave1.connectedCaves.add(cave2);
    cave2.connectedCaves.add(cave1);
  }

  name: string;
  major: boolean;
  connectedCaves = new Set<Cave>();

  constructor(name: string) {
    this.name = name;
    this.major = name.toUpperCase() === name;
  }

  findPathsTo(target: string, path: string[] = [], paths: string[][] = []): string[] {
    const currentPath = path.concat(this.name);
    if (this.name === target) {
      paths.push(currentPath);
    } else {
      for (const cave of this.connectedCaves) {
        if (cave.major || !path.includes(cave.name)) {
          cave.findPathsTo(target, currentPath, paths);
        }
      }
    }
    return paths.map((path) => path.join(','));
  }

  findPathsTo2(
    source: string,
    target: string,
    path: string[] = [],
    paths: string[][] = [],
    doubleMinorExhausted?: boolean
  ): string[] {
    const currentPath = path.concat(this.name);
    if (this.name === target) {
      paths.push(currentPath);
    } else {
      for (const cave of this.connectedCaves) {
        if (cave.name !== source) {
          if (cave.major || !path.includes(cave.name)) {
            cave.findPathsTo2(source, target, currentPath, paths, doubleMinorExhausted);
          } else if (!doubleMinorExhausted) {
            cave.findPathsTo2(source, target, currentPath, paths, true);
          }
        }
      }
    }
    return paths.map((path) => path.join(','));
  }
}
