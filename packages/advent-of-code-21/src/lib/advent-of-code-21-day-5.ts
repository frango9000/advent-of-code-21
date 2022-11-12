import { map, Observable } from 'rxjs';
import { api } from './api';

export function day5_1(): Observable<number> {
  return getHotspots(false);
}

export function day5_2(): Observable<unknown> {
  return getHotspots(true);
}

function getHotspots(includeDiagonals = false): Observable<number> {
  return api.get('/5/input').pipe(
    map(({ data }) => {
      return data
        .trim()
        .split('\n')
        .map((item) => {
          const coordinates = item.split(' -> ').map((item) => {
            const points = item.split(',').map((item) => Number.parseInt(item));
            return { x: points[0], y: points[1] };
          });
          return new Vector(coordinates[0], coordinates[1]);
        })
        .filter((item) => includeDiagonals || item.from.x === item.to.x || item.from.y === item.to.y)
        .reduce((acc: Coordinate[], curr: Vector) => {
          acc.push(...curr.getAllCoordinates());
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

interface Coordinate {
  x: number;
  y: number;
}

class Vector {
  constructor(public readonly from: Coordinate, public readonly to: Coordinate) {
    this.from = from;
    this.to = to;
  }

  getAllCoordinates(): Coordinate[] {
    const coordinates = [];
    const deltaX = this.from.x < this.to.x ? 1 : this.from.x > this.to.x ? -1 : 0;
    const deltaY = this.from.y < this.to.y ? 1 : this.from.y > this.to.y ? -1 : 0;
    for (
      let x = this.from.x, y = this.from.y;
      (deltaX && (deltaX === 1 ? x <= this.to.x : x >= this.to.x)) ||
      (deltaY && (deltaY === 1 ? y <= this.to.y : y >= this.to.y));
      x += deltaX, y += deltaY
    ) {
      coordinates.push({ x, y });
    }
    return coordinates;
  }
}
