export class RequestTimeoutError extends Error {
  constructor() {
    super('Request timeout error.');
  }
}
