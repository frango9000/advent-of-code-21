import { firstValueFrom, map } from 'rxjs';
import { day9_1, day9_2 } from './advent-of-code-21-day-9';
import { api, mapData } from './api';

describe('Day 9: Smoke Basin', () => {
  it('should sum risk level of all heightmap low points', async () => {
    expect(day9_1()).toBe(15);
    return expect(firstValueFrom(api.get('/9/input').pipe(mapData, map(day9_1)))).resolves.toBe(570);
  });

  it('should get the product of the size of the 3 largest basins', async () => {
    expect(day9_2()).toBe(1134);
    return expect(firstValueFrom(api.get('/9/input').pipe(mapData, map(day9_2)))).resolves.toBe(899392);
  });
});
