import { firstValueFrom, map } from 'rxjs';
import { day9_1, day9_2, isLinearLowpoint } from './advent-of-code-21-day-9';
import { api, mapData } from './api';

describe('Day 9: Smoke Basin', () => {
  it('should sum risk level of all heightmap low points', async () => {
    expect(day9_1()).toBe(15);
    return expect(firstValueFrom(api.get('/9/input').pipe(mapData, map(day9_1)))).resolves.toBe(570);
  });

  it.skip('should do things', async () => {
    return expect(firstValueFrom(day9_2())).resolves.toBe(1024649);
  });

  it('should return true if on low point', () => {
    expect(isLinearLowpoint(4, 3, 4)).toBe(true);
    expect(isLinearLowpoint(4, 4, 4)).toBe(false);
    expect(isLinearLowpoint(4, 5, 4)).toBe(false);
    expect(isLinearLowpoint(undefined, 5, 6)).toBe(true);
    expect(isLinearLowpoint(4, 5, 6)).toBe(false);
    expect(isLinearLowpoint(4, 5, undefined)).toBe(false);
    expect(isLinearLowpoint(undefined, 5, 4)).toBe(false);
    expect(isLinearLowpoint(6, 5, 4)).toBe(false);
    expect(isLinearLowpoint(6, 5, undefined)).toBe(true);

    expect(isLinearLowpoint(0, 5, 4)).toBe(false);
    expect(isLinearLowpoint(6, 5, 4)).toBe(false);
    expect(isLinearLowpoint(6, 5, 0)).toBe(false);
    expect(isLinearLowpoint(6, 0, 4)).toBe(true);

    expect(isLinearLowpoint(0, 0, 0)).toBe(false);
    expect(isLinearLowpoint(6, 0, 0)).toBe(false);
  });
});
