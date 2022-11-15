export class StopWatch {
  start = 0;
  end = 0;

  constructor() {
    this.start = Date.now();
  }

  stop(): number {
    this.end = Date.now();
    return this.end - this.start;
  }

  stopAndLog(): void {
    console.log(`${this.stop()}ms`);
  }
}
