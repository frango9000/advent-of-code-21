import { map, Observable } from 'rxjs';
import { axios } from './axios';

export function day5_1(): Observable<number> {
  return axios.get('/5/input').pipe(
    map(({ data }) => {
      return data
        .split('\n')
        .map((item) => {
          let coordinates = item.split(' -> ').map((item) => {
            let points = item.split(',').map((item) => Number.parseInt(item));
            return { x: points[0], y: points[1] };
          });
          return { from: coordinates[0], to: coordinates[1] };
        })
        .filter((item) => item.from && item.to)
        .filter((item) => item.from.x === item.to.x || item.from.y === item.to.y)
        .reduce((acc: Coordinate[], curr: Vector) => {
          if (curr.to.x === curr.from.x) {
            for (let y = curr.from.y; y != curr.to.y; curr.from.y < curr.to.y ? y++ : y--) {
              acc.push({ x: curr.to.x, y });
            }
          } else {
            for (let x = curr.from.x; x != curr.to.x; curr.from.x < curr.to.x ? x++ : x--) {
              acc.push({ x, y: curr.to.y });
            }
          }
          acc.push(curr.to);
          return acc;
        }, [])
        .reduce((acc: { coordinate: Coordinate; counter: number }[], curr: Coordinate) => {
          const existing = acc.find(({ coordinate }) => coordinate.x === curr.x && coordinate.y === curr.y);
          if (existing) {
            existing.counter++;
          } else {
            acc.push({ coordinate: curr, counter: 1 });
          }
          return acc;
        }, [])
        .filter(({ counter }) => counter > 1).length;
    })
  );
}

export function day5_2(): Observable<unknown> {
  return axios.get('/5/input').pipe();
}

interface Coordinate {
  x: number;
  y: number;
}

interface Vector {
  from: Coordinate;
  to: Coordinate;
}
