import { map, Observable } from 'rxjs';
import { axios } from './axios';

export function day4_1(): Observable<number> {
  return axios.get('/4/input').pipe(
    map(({ data }) => {
      const input: string[] = data.split('\n\n');
      const bingoSequence = input[0].split(',').map((item) => parseInt(item));
      const bingoCards = input.slice(1).map((item) => new BingoCard(item));

      for (const number of bingoSequence) {
        for (const card of bingoCards) {
          if (card.markNumberAndCheckLineWinner(number)) {
            return card.getFinalScore(number);
          }
        }
      }
      throw new Error('No bingo winner');
    })
  );
}

export function day4_2(): Observable<unknown> {
  return axios.get('/4/input').pipe();
}

class BingoCard {
  private card: number[][] = [];
  private checks: boolean[][] = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ];

  constructor(rawCard: string) {
    this.card = rawCard.split('\n').map((item) =>
      item
        .trim()
        .split(/[ ]{1,}/)
        .map((item) => parseInt(item))
    );
  }

  markNumberAndCheckLineWinner(number: number): boolean {
    for (let i = 0; i < this.card.length; i++) {
      for (let j = 0; j < this.card[i].length; j++) {
        if (this.card[i][j] === number) {
          this.checks[i][j] = true;
          if (this.checks[i].every((item) => item)) return true;
          if (this.checks.map((item) => item[j]).every((item) => item)) return true;
          return false;
        }
      }
    }
    return false;
  }

  getFinalScore(finalNumber: number): number {
    return (
      this.card
        .reduce((acc, curr, i) => {
          return acc.concat(curr.filter((item, j) => !this.checks[i][j]));
        }, [])
        .reduce((acc, curr) => acc + curr, 0) * finalNumber
    );
  }
}
