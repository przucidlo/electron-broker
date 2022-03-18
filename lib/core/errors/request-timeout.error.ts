export class RequestTimeoutError extends Error {
  constructor() {
    super('Request timeout error.');

    this.name = 'RequestTimeoutError';

    Object.setPrototypeOf(this, RequestTimeoutError.prototype);
  }
}
