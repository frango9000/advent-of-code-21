import { firstValueFrom, map } from 'rxjs';
import { day11_1, day11_2 } from './advent-of-code-21-day-11';
import { api, mapData } from './api';

describe('Day 11: Dumbo Octopus', () => {
  it('should add lines score based on first incorrect escape', async () => {
    expect(day11_1()).toBe(1656);
    return expect(firstValueFrom(api.get('/11/input').pipe(mapData, map(day11_1)))).resolves.toBe(1617);
  });

  it.skip('should do stuff', async () => {
    expect(day11_2()).toBe(288957);
    return expect(firstValueFrom(api.get('/11/input').pipe(mapData, map(day11_2)))).resolves.toBe(2776842859);
  });
});
