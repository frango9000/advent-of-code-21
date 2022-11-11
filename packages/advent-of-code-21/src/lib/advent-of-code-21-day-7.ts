import { map, Observable } from 'rxjs';
import { axios } from './axios';

export function day7_1(): Observable<number> {
  return axios.get('/7/input').pipe(
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

export function day7_2(): Observable<unknown> {
  return axios.get('/7/input').pipe();
}
