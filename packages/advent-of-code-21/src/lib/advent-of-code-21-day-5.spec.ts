import { day5_1, day5_2 } from './advent-of-code-21-day-5';
import { firstValueFrom } from 'rxjs';

describe('Day 5', () => {
  it('should get horizontal and vertical dangerous hot spots', async () => {
    return expect(firstValueFrom(day5_1())).resolves.toBe(6397);
  });

  it('should get horizontal, vertical and diagonal dangerous hot spots', async () => {
    return expect(firstValueFrom(day5_2())).resolves.toBe(22335);
  });
});
