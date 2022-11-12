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
  return data?.length;
}
