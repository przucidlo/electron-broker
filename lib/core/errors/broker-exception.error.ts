import { SerializedError } from '../interfaces/serialized-error.interface';

export default class BrokerExceptionError extends Error {
  constructor(serializedError: SerializedError) {
    super();

    Object.assign(this, serializedError);
    Object.setPrototypeOf(this, BrokerExceptionError.prototype);
  }
}
