import { api } from './api';
import { bufferCount, concat, filter, map, mergeMap, Observable, of, pairwise, toArray } from 'rxjs';

export function day1_1(): Observable<number> {
  return api.get('/1/input').pipe(
    map(({ data }) => data.split('\n').map((item) => of(Number.parseInt(item)))),
    mergeMap((data: Observable<string>[]) => concat(...data)),
    pairwise(),
    filter(([a, b]) => b > a),
    toArray(),
    map((increments) => increments.length)
  );
}

export function day1_2(): Observable<number> {
  return api.get('/1/input').pipe(
    map(({ data }) => data.split('\n').map((item) => of(Number.parseInt(item)))),
    mergeMap((data: Observable<string>[]) => concat(...data)),
    bufferCount(4, 1),
    filter(([a, b, c, d]) => b + c + d > a + b + c),
    toArray(),
    map((increments) => increments.length)
  );
}
