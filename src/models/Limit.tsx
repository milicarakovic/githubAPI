export class Limit {
  limit: number;
  remaining: number;
  coreLimit: number;

  constructor(limit: number, remaining: number, coreLimit: number) {
    this.limit = limit;
    this.remaining = remaining;
    this.coreLimit = coreLimit;
  }
}
