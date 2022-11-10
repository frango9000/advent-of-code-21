import { concat, last, map, mergeMap, Observable, of, scan } from 'rxjs';
import { axios } from './axios';

export function day3_1(): Observable<{ gamma: number; epsilon: number }> {
  return axios.get('/3/input').pipe(
    map(({ data }) => data.split('\n').map((item) => of(item))),
    mergeMap((data: Observable<string>[]) => concat(...data)),
    scan(
      (acc: { counter: number[]; length: number }, curr: string) => {
        for (let i = 0; i < curr.length; i++) {
          if (!acc.counter[i]) acc.counter[i] = 0;
          if (curr.charAt(i) === '1') acc.counter[i]++;
        }
        acc.length++;
        return acc;
      },
      { counter: [], length: 0 }
    ),
    last(),
    map((result: { counter: number[]; length: number }) =>
      result.counter.map((item) => (item > result.length / 2 ? '1' : '0')).join('')
    ),
    map((binaryGamma: string) => ({
      gamma: parseInt(binaryGamma, 2),
      epsilon: Math.pow(2, binaryGamma.length) - 1 - parseInt(binaryGamma, 2),
    }))
  );
}

export function day3_2(): Observable<{ oxygenGenerationRate: number; co2ScrubberRate: number }> {
  return axios.get('/3/input').pipe(
    map(({ data }) => data.split('\n')),
    map((diagnostics: string[]) => {
      function getCommonRate(diagnostics: string[], mostCommon = true, index = 0): string {
        const commonDigit =
          diagnostics.reduce((acc: number, curr: string) => {
            if (curr.charAt(index) === '1') acc++;
            return acc;
          }, 0) >=
          diagnostics.length / 2
            ? mostCommon
              ? '1'
              : '0'
            : mostCommon
            ? '0'
            : '1';
        const commonDiagnostics = diagnostics.filter((item) => item.charAt(index) === commonDigit);
        if (!commonDiagnostics.length) return null;
        if (commonDiagnostics.length === 1) return commonDiagnostics[0];
        return getCommonRate(commonDiagnostics, mostCommon, index + 1);
      }

      return {
        oxygenGenerationRate: parseInt(getCommonRate(diagnostics), 2),
        co2ScrubberRate: parseInt(getCommonRate(diagnostics, false), 2),
      };
    })
  );
}
