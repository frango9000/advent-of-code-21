import { map, Observable } from 'rxjs';
import { api } from './api';

export function day4_1(): Observable<number> {
  return api.get('/4/input').pipe(
    map(({ data }) => {
      const input: string[] = data.split('\n\n');
      const bingoSequence = input
        .shift()
        .split(',')
        .map((item) => parseInt(item));
      const bingoCards = input.map((item) => new BingoCard(item));

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
  return api.get('/4/input').pipe(
    map(({ data }) => {
      const input: string[] = data.split('\n\n');
      const bingoSequence = input
        .shift()
        .split(',')
        .map((item) => parseInt(item));
      let bingoCards = input.map((item) => new BingoCard(item));

      let bingoRound = -1;
      let lastWinner: BingoCard | undefined;
      while (bingoCards.length) {
        bingoRound++;
        const winners: BingoCard[] = [];
        for (const card of bingoCards) {
          if (card.markNumberAndCheckLineWinner(bingoSequence[bingoRound])) {
            winners.push(card);
            lastWinner = card;
          }
        }
        bingoCards = bingoCards.filter((card) => !winners.includes(card));
      }
      return lastWinner?.getFinalScore(bingoSequence[bingoRound]);
    })
  );
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
