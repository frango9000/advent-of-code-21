import { concat, last, map, mergeMap, Observable, of, scan } from 'rxjs';
import { api } from './api';

export function day2_1(): Observable<{ x: number; y: number }> {
  return api.get('/2/input').pipe(
    map(({ data }) => data.split('\n').map((item) => of(item))),
    mergeMap((data: Observable<string>[]) => concat(...data)),
    scan(
      (acc: { x: number; y: number }, curr: string) => {
        const direction = curr.split(' ')[0];
        const magnitude = Number.parseInt(curr.split(' ')[1]);
        const deltaX = direction === 'forward' ? magnitude : 0;
        const deltaY = direction === 'up' ? -magnitude : direction === 'down' ? +magnitude : 0;
        return { x: acc.x + deltaX, y: acc.y + deltaY };
      },
      { x: 0, y: 0 }
    ),
    last()
  );
}

export function day2_2(): Observable<{ x: number; y: number; aim: number }> {
  return api.get('/2/input').pipe(
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
  );
}
