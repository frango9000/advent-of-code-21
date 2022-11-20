import { firstValueFrom, map } from 'rxjs';
import {
  day15_1,
  day15_2,
  testData0,
  testData1,
  testData2,
  testData3,
  testData4,
  testData5,
  testData6,
  testData7,
  testData8,
} from './advent-of-code-21-day-15';
import { api, mapData } from './api';

describe('Day 15: Chiton', () => {
  it('should return lowest total risk of any path from the top left to the bottom right', async () => {
    expect(day15_1(testData0)).toBe(4);
    expect(day15_1(testData1)).toBe(7);
    expect(day15_1(testData2)).toBe(17);
    expect(day15_1(testData3)).toBe(24);
    expect(day15_1(testData4)).toBe(25);
    expect(day15_1(testData5)).toBe(28);
    expect(day15_1(testData6)).toBe(35);
    expect(day15_1(testData7)).toBe(38);
    expect(day15_1(testData8)).toBe(40);
    return expect(firstValueFrom(api.get('/15/input').pipe(mapData, map(day15_1)))).resolves.toBe(37);
  });

  it.skip('should ', async () => {
    expect(day15_2(testData1)).toBe(0);
    return expect(firstValueFrom(api.get('/15/input').pipe(mapData, map(day15_2)))).resolves.toBe(0);
  });
});
