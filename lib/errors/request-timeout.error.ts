export class RequestTimeoutError extends Error {
  constructor() {
    super('Request timeout error.');

    Object.setPrototypeOf(this, RequestTimeoutError.prototype);
  }
}
