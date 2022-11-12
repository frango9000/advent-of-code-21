const testData = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

const openers = ['(', '[', '{', '<'];
const closers = [')', ']', '}', '>'];

export function day10_1(data = testData): number {
  return data
    .trim()
    .split('\n')
    .map((line) => {
      const fifo = [];

      for (let i = 0; i < line.length; i++) {
        if (openers.includes(line[i])) {
          fifo.push(line[i]);
        } else if (closers.includes(line[i])) {
          const lastOpener = fifo.pop();
          if (openers.indexOf(lastOpener) !== closers.indexOf(line[i])) {
            return line[i];
          }
        }
      }
      return '';
    })
    .filter((line) => !!line?.length)
    .reduce((acc, line) => {
      switch (line) {
        case ')':
          return acc + 3;
        case ']':
          return acc + 57;
        case '}':
          return acc + 1197;
        case '>':
          return acc + 25137;
        default:
          return acc;
      }
    }, 0);
}

export function day10_2(data = testData): number {
  const scores: number[] = data
    .trim()
    .split('\n')
    .filter((line) => {
      const fifo = [];
      for (let i = 0; i < line.length; i++) {
        if (openers.includes(line[i])) {
          fifo.push(line[i]);
        } else if (closers.includes(line[i])) {
          const lastOpener = fifo.pop();
          if (openers.indexOf(lastOpener) !== closers.indexOf(line[i])) {
            return false;
          }
        }
      }
      return true;
    })
    .map((line) => {
      const fifo = [];
      for (let i = 0; i < line.length; i++) {
        if (openers.includes(line[i])) {
          fifo.push(line[i]);
        } else if (closers.includes(line[i])) {
          fifo.pop();
        }
      }
      return fifo
        .map((char) => closers[openers.indexOf(char)])
        .reverse()
        .join('');
    })
    .map((item) =>
      item.split('').reduce((acc, item) => {
        switch (item) {
          case ')':
            return 5 * acc + 1;
          case ']':
            return 5 * acc + 2;
          case '}':
            return 5 * acc + 3;
          case '>':
            return 5 * acc + 4;
        }
      }, 0)
    )
    .sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}
