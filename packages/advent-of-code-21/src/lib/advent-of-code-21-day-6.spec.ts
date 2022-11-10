import { firstValueFrom } from 'rxjs';
import { day6_1, day6_2 } from './advent-of-code-21-day-6';

describe('Day 6', () => {
  it('should get number of lantern fish in 80 days', async () => {
    return expect(firstValueFrom(day6_1())).resolves.toBe(345387);
  });

  it('should get number of lantern fish in 256 days', async () => {
    return expect(firstValueFrom(day6_2())).resolves.toBe(1574445493136);
  });
});
