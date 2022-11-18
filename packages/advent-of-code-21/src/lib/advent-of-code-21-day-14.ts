export const testData1 = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

export function day14_1(data = testData1): number {
  return day14(data, 10);
}

export function day14_2(data = testData1): number {
  return day14(data, 40);
}

export function day14(data = testData1, loops = 10): number {
  const [initial, rawInsertions]: string[] = data.trim().split('\n\n');

  const initialList = initial.split('');
  const state = {};
  for (let i = 0; i < initialList.length - 1; i++) {
    const pair = state[initialList[i] + initialList[i + 1]];
    state[initialList[i] + initialList[i + 1]] = pair ? pair + 1 : 1;
  }

  const insertions: { [p: string]: string } = rawInsertions.split('\n').reduce((acc, insertion) => {
    const [from, to] = insertion.split(' -> ');
    return { ...acc, [from]: to };
  }, {});

  for (let i = 0; i < loops; i++) {
    const currentPairs = Object.keys(state);
    const newState = {};
    for (const pair of currentPairs) {
      if (state[pair] && insertions[pair]) {
        const leftPair = newState[pair[0] + insertions[pair]];
        newState[pair[0] + insertions[pair]] = leftPair ? leftPair + state[pair] : state[pair];

        const rightPair = newState[insertions[pair] + pair[1]];
        newState[insertions[pair] + pair[1]] = rightPair ? rightPair + state[pair] : state[pair];
        delete state[pair];
      }
    }
    const newPairs = Object.keys(newState);
    for (const pair of newPairs) {
      const currentPair = state[pair];
      state[pair] = currentPair ? currentPair + newState[pair] : newState[pair];
    }
  }

  const resultCount = Object.keys(state).reduce((acc, pair) => {
    acc[pair[1]] = acc[pair[1]] ? acc[pair[1]] + state[pair] : state[pair];
    return acc;
  }, {});
  resultCount[initialList[0]]++;
  const min = Math.min(...Object.keys(resultCount).map((key) => resultCount[key]));
  const max = Math.max(...Object.keys(resultCount).map((key) => resultCount[key]));

  return max - min;
}
