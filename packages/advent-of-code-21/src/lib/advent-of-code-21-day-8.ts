import { map, Observable } from 'rxjs';
import { axios } from './axios';

/*

number:segments

  0:6     1:2     2:5     3:5     4:4
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:5     6:6     7:3     8:7     9:6
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

cdfbe: 5
gcdfa: 2
fbcad: 3
segment:usages
a:8
b:6
c:7
d:7
e:4
f:9
g:7

segment_size:usages

2:1
3:1
4:1
5:3
6:3
7:1

  // private readonly segments = [
  //   ['a', 'b', 'c', 'e', 'f', 'f'],
  //   ['c', 'f'],
  //   ['a', 'c', 'd', 'e', 'f'],
  //   ['a', 'c', 'd', 'f', 'f'],
  //   ['b', 'c', 'd', 'f'],
  //   ['a', 'b', 'd', 'f', 'f'],
  //   ['a', 'b', 'd', 'e', 'f', 'f'],
  //   ['a', 'c', 'f'],
  //   ['a', 'b', 'c', 'd', 'e', 'f', 'f'],
  //   ['a', 'b', 'c', 'd', 'f', 'f'],
  // ];

*/

const uniqueNumbers = ['11'.length, '4444'.length, '777'.length, '8888888'.length];

export function day8_1(): Observable<number> {
  // const uniqueNumbers = [2, 4, 3, 7]
  return axios.get('/8/input').pipe(
    map(({ data }) => {
      return data
        .trim()
        .split('\n')
        .map((item) => item.split(' | ').pop().trim().split(' '))
        .flat()
        .map((item) => item.length)
        .filter((item) => uniqueNumbers.includes(item)).length;
    })
  );
}

export function day8_2(): Observable<number> {
  return axios.get('/8/input').pipe(
    map(({ data }) => {
      return data
        .trim()
        .split('\n')
        .map((item) => {
          const [segments, usages] = item.split(' | ');
          return new SevenSegmentDecoder(segments).decode(usages);
        })
        .reduce((acc, item) => acc + item, 0);
    })
  );
}

export class SevenSegmentDecoder {
  private segments = [];

  constructor(control: string) {
    const keys = control
      .trim()
      .split(' ')
      .sort((a) => (uniqueNumbers.includes(a.length) ? -1 : 1));
    for (const key of keys) {
      switch (key.length) {
        case 2:
          this.segments[1] = key;
          break;
        case 3:
          this.segments[7] = key;
          break;
        case 4:
          this.segments[4] = key;
          break;
        case 7:
          this.segments[8] = key;
          break;
        case 6:
          if (this.getDifference(key, this.segments[4]).length === 2) {
            this.segments[9] = key;
          } else if (this.getDifference(key, this.segments[1]).length === 4) {
            this.segments[0] = key;
          } else {
            this.segments[6] = key;
          }
          break;
        case 5:
          if (this.getDifference(key, this.segments[4]).length === 3) {
            this.segments[2] = key;
          } else if (this.getDifference(key, this.segments[1]).length === 3) {
            this.segments[3] = key;
          } else {
            this.segments[5] = key;
          }
          break;
      }
    }
  }

  public decode(input: string): number {
    return Number.parseInt(
      input
        .trim()
        .split(' ')
        .map((item) => this.getDecodedNumber(item))
        .join('')
    );
  }

  getUnion(digit1: string, digit2: string): string {
    return this.getDifference(digit1, digit2) + digit2;
  }

  getIntersection(item1: string, item2: string): string {
    return this.getDifference(item1, this.getDifference(item1, item2));
  }

  getDifference(item1: string, item2: string): string {
    return item1.replace(new RegExp(`[${item2}]`, 'gi'), '');
  }

  getDecodedNumber(input: string): number {
    for (let i = 0; i < this.segments.length; i++) {
      if (this.segments[i]?.length === input.length && this.getDifference(this.segments[i], input).length === 0) {
        return i;
      }
    }
    return -1;
  }
}
