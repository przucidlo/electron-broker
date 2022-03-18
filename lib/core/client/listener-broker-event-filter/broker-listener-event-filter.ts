import { BROKER_EXCEPTION_MARKER } from '../../constants/exceptions';
import BrokerExceptionError from '../../errors/broker-exception.error';
import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { SerializedError } from '../../interfaces/serialized-error.interface';
import { BrokerEventListener } from '../../types/broker-event-listener.type';

export class ListenerBrokerEventFilter {
  public static createEventFilter(
    resolve: (value?: unknown) => void,
    reject: (value?: unknown) => void,
  ): BrokerEventListener {
    return (response) => {
      if (this.isResponse(response)) {
        const data = response.data;

        if (!this.isBrokerException(data)) {
          resolve(response);
        } else {
          reject(new BrokerExceptionError(data));
        }
      }
    };
  }

  private static isResponse(brokerEvent: BrokerEvent): boolean {
    return brokerEvent && brokerEvent.type === 'RESPONSE';
  }

  private static isBrokerException(data?: unknown): data is SerializedError {
    return data && data[BROKER_EXCEPTION_MARKER];
  }
}
