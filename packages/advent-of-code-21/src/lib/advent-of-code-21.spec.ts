import {Axios} from 'axios-observable';
import {concat, filter, map, mergeMap, Observable, of, pairwise, toArray,} from 'rxjs';

describe('advent of code 21', () => {
  const axios: Axios = Axios.create({
    method: 'GET',
    baseURL: 'https://adventofcode.com/2021/day',
    headers: {
      cookie:
        'session=53616c7465645f5fe62b34f231994da651f661155f9a1623b9c55536d7742626f7fd6b38a56805d4b27a43f17fda4ff18356b87395bbc798b64609b393130fad',
    },
  });

  describe('Day 1', () => {
    it('should return number of increments', (done) => {
      axios
        .get('/1/input')
        .pipe(
          map(({data}) =>
            data.split('\n').map((item) => of(Number.parseInt(item)))
          ),
          mergeMap((data: Observable<string>[]) => concat(...data)),
          pairwise(),
          filter(([a, b]) => b > a),
          toArray(),
          map((increments) => increments.length)
        )
        .subscribe({
          next: (result) => {
            console.log('Number of increments: ' + result);
            expect(result).toEqual(1342);
            done();
          },
        });
    });
  });
});
