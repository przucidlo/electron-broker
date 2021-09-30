import { BROKER_EXCEPTION_MARKER } from '../../constants/exceptions';
import BrokerExceptionError from '../../errors/broker-exception.error';
import { RequestTimeoutError } from '../../errors/request-timeout.error';
import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { SerializedError } from '../../interfaces/serialized-error.interface';
import { ListenerAdapter } from '../listener-adapter/listener-adapter.interface';

type Listener = (response: BrokerEvent) => void;

export class ResponseListener {
  private readonly PROMISE_TIMEOUT: number = 30;
  private timeout: NodeJS.Timeout;

  constructor(
    private brokerEvent: BrokerEvent,
    private listenerAdapter: ListenerAdapter,
  ) {}

  public async listen(): Promise<BrokerEvent> {
    try {
      return await this.listenWithTimeout();
    } catch (err) {
      throw err;
    } finally {
      this.cleanUp();
    }
  }

  private cleanUp(): void {
    this.listenerAdapter.removeListener();
    clearTimeout(this.timeout);
  }

  private listenWithTimeout<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.listenerAdapter.listen(
        this.brokerEvent.pattern,
        this.createResponseListener(resolve, reject),
      );

      this.setResponseTimeout(reject);
    });
  }

  private createResponseListener(
    resolve: (value?: unknown) => void,
    reject: (value?: unknown) => void,
  ): Listener {
    return (response) => {
      if (this.isExpectedResponse(response)) {
        const data = response.data;

        if (!this.isBrokerException(data)) {
          resolve(response);
        } else {
          reject(new BrokerExceptionError(data));
        }
      }
    };
  }

  private isExpectedResponse(response: BrokerEvent): boolean {
    return (
      response.eventId === this.brokerEvent.eventId &&
      response.type === 'RESPONSE'
    );
  }

  private isBrokerException(data?: unknown): data is SerializedError {
    return data && data[BROKER_EXCEPTION_MARKER];
  }

  private setResponseTimeout(reject: (reason: any) => void) {
    this.timeout = setTimeout(
      () => reject(new RequestTimeoutError()),
      this.PROMISE_TIMEOUT * 1000,
    );
  }
}
