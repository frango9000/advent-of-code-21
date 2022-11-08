import { day2_1, day2_2 } from './advent-of-code-21-day-2';

describe('Day 2', () => {
  it('should track the depth and horizontal position', (done) => {
    day2_1().subscribe((result) => {
      expect(result.x * result.y).toEqual(1561344);
      done();
    });
  });

  it('should track the depth horizontal and aim', (done) => {
    day2_2().subscribe((result) => {
      expect(result.x * result.y).toEqual(1848454425);
      done();
    });
  });
});
