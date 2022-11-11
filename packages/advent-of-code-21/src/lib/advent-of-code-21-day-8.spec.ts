import { firstValueFrom } from 'rxjs';
import { day8_1, day8_2, SevenSegmentDecoder } from './advent-of-code-21-day-8';

describe('Day 8: Seven Segment Search', () => {
  it('should get amount of unique digits', async () => {
    return expect(firstValueFrom(day8_1())).resolves.toBe(409);
  });

  it('should decode sub seven-segment displays', async () => {
    return expect(firstValueFrom(day8_2())).resolves.toBe(1024649);
  });

  it('should test Seven Segment Decoder', () => {
    const decoder = new SevenSegmentDecoder('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab');

    expect(decoder.getDifference('abcde', 'bd')).toBe('ace');
    expect(decoder.getDifference('abcde', 'bdf')).toBe('ace');
    expect(decoder.getUnion('ab', 'de')).toBe('abde');
    expect(decoder.getUnion('ab', 'bde')).toBe('abde');
    expect(decoder.getIntersection('abcd', 'cdef')).toBe('cd');
    expect(decoder.getIntersection('abcdg', 'cdefh')).toBe('cd');

    expect(decoder['segments'][1]).toBe('ab');
    expect(decoder.getDecodedNumber('ab')).toBe(1);
    expect(decoder['segments'][4]).toBe('eafb');
    expect(decoder.getDecodedNumber('eafb')).toBe(4);
    expect(decoder['segments'][7]).toBe('dab');
    expect(decoder.getDecodedNumber('dab')).toBe(7);
    expect(decoder['segments'][8]).toBe('acedgfb');
    expect(decoder.getDecodedNumber('acedgfb')).toBe(8);

    expect(decoder['segments'][0]).toBe('cagedb');
    expect(decoder.getDecodedNumber('cagedb')).toBe(0);
    expect(decoder['segments'][6]).toBe('cdfgeb');
    expect(decoder.getDecodedNumber('cdfgeb')).toBe(6);
    expect(decoder['segments'][9]).toBe('cefabd');
    expect(decoder.getDecodedNumber('cefabd')).toBe(9);

    expect(decoder['segments'][2]).toBe('gcdfa');
    expect(decoder.getDecodedNumber('gcdfa')).toBe(2);
    expect(decoder['segments'][3]).toBe('fbcad');
    expect(decoder.getDecodedNumber('fbcad')).toBe(3);
    expect(decoder['segments'][5]).toBe('cdfbe');
    expect(decoder.getDecodedNumber('cdfbe')).toBe(5);

    expect(decoder.decode('cdfeb fcadb cdfeb cdbaf')).toBe(5353);
  });
});
