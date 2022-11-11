import { firstValueFrom } from 'rxjs';
import { day7_1, day7_2 } from './advent-of-code-21-day-7';

describe('Day 7', () => {
  it('should get number of lantern fish in 80 days', async () => {
    return expect(firstValueFrom(day7_1())).resolves.toBe(336131);
  });

  it.skip('should get number of lantern fish in 257 days', async () => {
    return expect(firstValueFrom(day7_2())).resolves.toBeTruthy();
  });
});
