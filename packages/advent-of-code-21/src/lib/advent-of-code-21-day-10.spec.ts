import { firstValueFrom, map } from 'rxjs';
import { day10_1, day10_2 } from './advent-of-code-21-day-10';
import { api, mapData } from './api';

describe('Day 10: Syntax Scoring', () => {
  it('should add lines score based on first incorrect escape', async () => {
    expect(day10_1()).toBe(26397);
    return expect(firstValueFrom(api.get('/10/input').pipe(mapData, map(day10_1)))).resolves.toBe(167379);
  });

  it('should return the middle score of the autocompleted sequences', async () => {
    expect(day10_2()).toBe(288957);
    return expect(firstValueFrom(api.get('/10/input').pipe(mapData, map(day10_2)))).resolves.toBe(2776842859);
  });
});
