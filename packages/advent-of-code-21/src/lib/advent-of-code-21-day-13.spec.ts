import { firstValueFrom, map } from 'rxjs';
import { day13_1, day13_2, testData1 } from './advent-of-code-21-day-13';
import { api, mapData } from './api';

describe('Day 13: Transparent Origami', () => {
  it('should show how many dots are visible after completing just the first fold instruction', async () => {
    expect(day13_1(testData1)).toBe(17);
    return expect(firstValueFrom(api.get('/13/input').pipe(mapData, map(day13_1)))).resolves.toBe(693);
  });

  it.skip('should how many dots are visible after completing all fold instruction', async () => {
    expect(day13_2(testData1)).toBe(36);
    return expect(firstValueFrom(api.get('/13/input').pipe(mapData, map(day13_2)))).resolves.toBe(149385);
  });
});
