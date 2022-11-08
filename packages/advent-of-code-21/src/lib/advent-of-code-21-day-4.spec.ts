import { day4_1 } from './advent-of-code-21-day-4';

describe('Day 4', () => {
  it('should get bingo winner', (done) => {
    day4_1().subscribe((finalScore) => {
      expect(finalScore).toBe(16716);
      done();
    });
  });
});
