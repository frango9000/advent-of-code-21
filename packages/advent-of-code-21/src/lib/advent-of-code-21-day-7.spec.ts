import { firstValueFrom } from 'rxjs';
import { day7_1, day7_2 } from './advent-of-code-21-day-7';

describe('Day 7', () => {
  it('should get optimal crab subs angle linear cost', async () => {
    return expect(firstValueFrom(day7_1())).resolves.toBe(336131);
  });

  it('should get optimal crab subs angle scaling cost', async () => {
    return expect(firstValueFrom(day7_2())).resolves.toBe(92676646);
  });
});
