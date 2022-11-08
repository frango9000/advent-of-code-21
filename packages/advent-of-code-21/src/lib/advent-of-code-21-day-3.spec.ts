import { day3_1, day3_2 } from './advent-of-code-21-day-3';

describe('Day 3', () => {
  it('should return the power consumption', (done) => {
    day3_1().subscribe((result: { gamma: number; epsilon: number }) => {
      expect(result.gamma * result.epsilon).toEqual(3901196);
      done();
    });
  });

  it('should verify the life support rating', (done) => {
    day3_2().subscribe((result: { oxygenGenerationRate: number; co2ScrubberRate: number }) => {
      expect(result.oxygenGenerationRate * result.co2ScrubberRate).toBe(4412188);
      done();
    });
  });
});
