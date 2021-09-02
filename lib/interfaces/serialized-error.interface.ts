import { BROKER_EXCEPTION_MARKER } from '../constants/exceptions';

export interface SerializedError {
  [BROKER_EXCEPTION_MARKER]: boolean;
  stack: string;
  message: string;
}
