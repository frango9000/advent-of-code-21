import { Axios } from 'axios-observable';
import {
  bufferCount,
  concat,
  filter,
  last,
  map,
  mergeMap,
  Observable,
  of,
  pairwise,
  scan,
  toArray,
} from 'rxjs';

describe('advent of code 21', () => {
  const axios: Axios = Axios.create({
    method: 'GET',
    baseURL: 'https://adventofcode.com/2021/day',
    headers: {
      cookie:
        'session=53616c7465645f5fe62b34f231994da651f661155f9a1623b9c55536d7742626f7fd6b38a56805d4b27a43f17fda4ff18356b87395bbc798b64609b393130fad',
    },
  });

  describe('Day 1', () => {
    it('should return number of increments', (done) => {
      axios
        .get('/1/input')
        .pipe(
          map(({ data }) =>
            data.split('\n').map((item) => of(Number.parseInt(item)))
          ),
          mergeMap((data: Observable<string>[]) => concat(...data)),
          pairwise(),
          filter(([a, b]) => b > a),
          toArray(),
          map((increments) => increments.length)
        )
        .subscribe({
          next: (result) => {
            console.log('Number of increments: ' + result);
            expect(result).toEqual(1342);
            done();
          },
        });
    });

    it('should return number of interval increments', (done) => {
      axios
        .get('/1/input')
        .pipe(
          map(({ data }) =>
            data.split('\n').map((item) => of(Number.parseInt(item)))
          ),
          mergeMap((data: Observable<string>[]) => concat(...data)),
          bufferCount(4, 1),
          filter(([a, b, c, d]) => b + c + d > a + b + c),
          toArray(),
          map((increments) => increments.length)
        )
        .subscribe({
          next: (result) => {
            console.log('Number of increments: ' + result);
            expect(result).toEqual(1378);
            done();
          },
        });
    });
  });
  describe('Day 2', () => {
    it('should track the depth and horizontal position', (done) => {
      axios
        .get('/2/input')
        .pipe(
          map(({ data }) => data.split('\n').map((item) => of(item))),
          mergeMap((data: Observable<string>[]) => concat(...data)),
          scan(
            (acc: { x: number; y: number }, curr: string) => {
              const direction = curr.split(' ')[0];
              const magnitude = Number.parseInt(curr.split(' ')[1]);
              let deltaX = direction === 'forward' ? magnitude : 0;
              let deltaY =
                direction === 'up'
                  ? -magnitude
                  : direction === 'down'
                  ? +magnitude
                  : 0;
              return { x: acc.x + deltaX, y: acc.y + deltaY };
            },
            { x: 0, y: 0 }
          ),
          last()
        )
        .subscribe({
          next: (result) => {
            console.log('Final Position: x: ' + result.x + ' y: ' + result.y);
            console.log('Final answer: ' + result.x * result.y);

            expect(result.x * result.y).toEqual(1561344);
            done();
          },
        });
    });

    it('should track the depth horizontal and aim', (done) => {
      axios
        .get('/2/input')
        .pipe(
          map(({ data }) => data.split('\n').map((item) => of(item))),
          mergeMap((data: Observable<string>[]) => concat(...data)),
          scan(
            (acc: { x: number; y: number; aim: number }, curr: string) => {
              const direction = curr.split(' ')[0];
              const magnitude = Number.parseInt(curr.split(' ')[1]);
              let deltaX = 0,
                deltaY = 0,
                deltaAim = 0;

              switch (direction) {
                case 'up':
                  deltaAim = -magnitude;
                  break;
                case 'down':
                  deltaAim = magnitude;
                  break;
                case 'forward':
                  deltaX = magnitude;
                  deltaY = acc.aim * magnitude;
                  break;
              }

              return {
                x: acc.x + deltaX,
                y: acc.y + deltaY,
                aim: acc.aim + deltaAim,
              };
            },
            { x: 0, y: 0, aim: 0 }
          ),
          last()
        )
        .subscribe({
          next: (result) => {
            console.log('Final Position: x: ' + result.x + ' y: ' + result.y);
            console.log('Final answer: ' + result.x * result.y);

            expect(result.x * result.y).toEqual(1848454425);
            done();
          },
        });
    });
  });
});
