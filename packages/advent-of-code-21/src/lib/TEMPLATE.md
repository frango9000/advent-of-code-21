### Implementation

```

import { map, Observable } from 'rxjs';
import { api } from '@advent-of-code-21/advent-of-code-21';

export function day0_1(): Observable<number> {
  return api.get('/0/input').pipe(
    map(({ data }) => {
      return data
        .trim()
        .split('\n').length
    })
  );
}

export function day0_2(): Observable<number> {
  return api.get('/0/input').pipe(
    map(({ data }) => {
      return data
        .trim()
        .split('\n').length
    })
  );
}


```

### Test

```

import { firstValueFrom } from 'rxjs';
import { day0_1, day0_2 } from './advent-of-code-21-day-0';

describe('Day 0: Advent of Code', () => {
  it('should test stuff', async () => {
    return expect(firstValueFrom(day0_1())).resolves.toBe(1);
  });

  it('should test more stuff', async () => {
    return expect(firstValueFrom(day0_2())).resolves.toBe(1);
  });
});


```
