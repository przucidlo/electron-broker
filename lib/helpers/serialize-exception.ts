import { BROKER_EXCEPTION_MARKER } from '../constants/exceptions';
import { SerializedError } from '../interfaces/serialized-error.interface';

export default function serializeException(error: Error): SerializedError {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    ...error,
    [BROKER_EXCEPTION_MARKER]: true,
  };
}
