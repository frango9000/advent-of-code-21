import { day1_1, day1_2 } from './advent-of-code-21-day-1';

describe('Day 1', () => {
  it('should return number of increments', (done) => {
    day1_1().subscribe((increments) => {
      expect(increments).toEqual(1342);
      done();
    });
  });

  it('should return number of interval increments', (done) => {
    day1_2().subscribe((increments) => {
      expect(increments).toEqual(1378);
      done();
    });
  });
});
