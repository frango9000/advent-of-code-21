import { firstValueFrom, map } from 'rxjs';
import { day14_1, day14_2, testData1 } from './advent-of-code-21-day-14';
import { api, mapData } from './api';

describe('Day 14: Extended Polymerization', () => {
  it('should show quantity of the most common element and subtract the quantity of the least common element after 10 loops', async () => {
    expect(day14_1(testData1)).toBe(1588);
    return expect(firstValueFrom(api.get('/14/input').pipe(mapData, map(day14_1)))).resolves.toBe(2170);
  });

  it('should show quantity of the most common element and subtract the quantity of the least common element after 40 loops', async () => {
    expect(day14_2(testData1)).toBe(2188189693529);
    return expect(firstValueFrom(api.get('/14/input').pipe(mapData, map(day14_2)))).resolves.toBe(2422444761283);
  });
});
