import { map, Observable } from 'rxjs';
import { api } from './api';

export function day7_1(): Observable<number> {
  return api.get('/7/input').pipe(
    map(({ data }) => {
      const crabSubs = data
        .trim()
        .split(',')
        .map((item) => Number.parseInt(item));

      const { min, max } = crabSubs.reduce(
        (acc, curr) => ({
          min: Math.min(acc.min, curr),
          max: Math.max(acc.max, curr),
        }),
        {
          min: crabSubs[0],
          max: crabSubs[0],
        }
      );

      const deltas: number[] = [];
      for (let i = min; i <= max; i++) {
        deltas.push(crabSubs.reduce((acc, curr) => acc + Math.abs(curr - i), 0));
      }
      return deltas.reduce((acc: number, curr: number) => Math.min(acc, curr), deltas[0]);
    })
  );
}

export function day7_2(): Observable<number> {
  return api.get('/7/input').pipe(
    // return of({ data: '16,1,2,0,4,2,7,1,2,14' }).pipe(
    map(({ data }) => {
      const crabSubs = data
        .trim()
        .split(',')
        .map((item) => Number.parseInt(item));

      const { min, max } = crabSubs.reduce(
        (acc, curr) => ({
          min: Math.min(acc.min, curr),
          max: Math.max(acc.max, curr),
        }),
        {
          min: crabSubs[0],
          max: crabSubs[0],
        }
      );

      const deltas: number[] = [];
      for (let direction = min; direction <= max; direction++) {
        deltas.push(
          crabSubs.reduce((acc, curr) => {
            return acc + getIterativeDelta(Math.abs(curr - direction));
          }, 0)
        );
      }
      return deltas.reduce((acc: number, curr: number) => Math.min(acc, curr), deltas[0]);
    })
  );
}

export function getRecursiveDelta(distance: number): number {
  if (distance === 0) {
    return 0;
  }
  if (distance === 1) {
    return 1;
  }
  return getRecursiveDelta(distance - 1) + distance;
}

export function getIterativeDelta(distance: number): number {
  if (distance === 0) {
    return 0;
  }
  if (distance === 1) {
    return 1;
  }

  let delta = 0;
  for (let i = 1; i <= distance; i++) {
    delta += i;
  }
  return delta;
}
