import { firstValueFrom, map } from 'rxjs';
import { day12_1, day12_2, testData1, testData2, testData3 } from './advent-of-code-21-day-12';
import { api, mapData } from './api';

describe('Day 12: Passage Pathing', () => {
  it('should add count the number of possible node paths', async () => {
    expect(day12_1(testData1)).toBe(10);
    expect(day12_1(testData2)).toBe(19);
    expect(day12_1(testData3)).toBe(226);
    return expect(firstValueFrom(api.get('/12/input').pipe(mapData, map(day12_1)))).resolves.toBe(5254);
  });

  it.skip('should do stuff', async () => {
    expect(day12_2()).toBe(195);
    return expect(firstValueFrom(api.get('/12/input').pipe(mapData, map(day12_2)))).resolves.toBe(258);
  });
});
