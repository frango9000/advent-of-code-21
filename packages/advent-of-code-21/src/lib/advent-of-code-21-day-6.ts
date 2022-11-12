import { map, Observable } from 'rxjs';
import { api } from './api';

export function day6_1(): Observable<number> {
  return getLanternFishes(80);
}

export function day6_2(): Observable<number> {
  return getMoreLanternFishes(256);
}

function getLanternFishes(days = 80): Observable<number> {
  return api.get('/6/input').pipe(
    map(({ data }) => {
      const fishes = data
        .trim()
        .split(',')
        .map((item) => Number.parseInt(item));
      for (let day = 1; day <= days; day++) {
        for (let fishIndex = 0; fishIndex < fishes.length; fishIndex++) {
          fishes[fishIndex]--;
          if (fishes[fishIndex] < 0) {
            fishes[fishIndex] = 6;
            fishes.push(9);
          }
        }
      }

      return fishes.length;
    })
  );
}

function getMoreLanternFishes(days = 256): Observable<number> {
  return api.get('/6/input').pipe(
    map(({ data }) => {
      const fishes = data
        .trim()
        .split(',')
        .map((item) => Number.parseInt(item))
        .reduce(
          (acc: number[], curr: number) => {
            acc[curr]++;
            return acc;
          },
          [0, 0, 0, 0, 0, 0, 0, 0, 0]
        );

      for (let day = 0; day < days; day++) {
        const newFishes = fishes.shift();
        fishes[8] = newFishes;
        fishes[6] += newFishes;
      }

      return fishes.reduce((acc: number, curr: number) => acc + curr, 0);
    })
  );
}
