import { day5_1 } from './advent-of-code-21-day-5';

describe('Day 5', () => {
  it('should get dangerous hot spots', (done) => {
    day5_1().subscribe((finalScore) => {
      expect(finalScore).toBe(6397);
      done();
    });
  });

  // it('should get bingo looser', (done) => {
  //   day5_2().subscribe((finalScore) => {
  //     expect(finalScore).toBe(5);
  //     done();
  //   });
  // });
});
