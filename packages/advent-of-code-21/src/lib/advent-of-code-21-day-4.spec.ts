import { day4_1, day4_2 } from './advent-of-code-21-day-4';

describe('Day 4', () => {
  it('should get bingo winner', (done) => {
    day4_1().subscribe((finalScore) => {
      expect(finalScore).toBe(16716);
      done();
    });
  });

  it('should get bingo looser', (done) => {
    day4_2().subscribe((finalScore) => {
      expect(finalScore).toBe(4880);
      done();
    });
  });
});
