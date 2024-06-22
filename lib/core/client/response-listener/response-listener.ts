import { RequestTimeoutError } from '../../errors/request-timeout.error';
import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { BrokerEventListener } from '../../types/broker-event-listener.type';
import { ListenerBrokerEventFilter } from '../listener-broker-event-filter/broker-listener-event-filter';
import { IpcListener } from './ipc-listener';

export class ResponseListener {
  private timeout: NodeJS.Timeout;

  constructor(
    private brokerEvent: BrokerEvent,
    private listener: IpcListener,
    private timeoutInSeconds: number = 30,
  ) {}

  public async listen<R extends unknown>(): Promise<BrokerEvent<R>> {
    try {
      return await new Promise((resolve, reject) => {
        this.listener.listen(
          this.brokerEvent.pattern,
          this.createResponseListener(resolve, reject),
        );

        this.setResponseTimeout(reject);
      });
    } finally {
      this.cleanUp();
    }
  }

  private cleanUp(): void {
    clearTimeout(this.timeout);
    this.listener.removeListener();
  }

  public createResponseListener(
    resolve: (value?: unknown) => void,
    reject: (value?: unknown) => void,
  ): BrokerEventListener {
    return (response) => {
      if (this.compareEventId(response)) {
        return ListenerBrokerEventFilter.createEventFilter(
          resolve,
          reject,
        )(response);
      }
    };
  }

  private compareEventId(response: BrokerEvent): boolean {
    return response.eventId === this.brokerEvent.eventId;
  }

  private setResponseTimeout(reject: (reason: any) => void) {
    this.timeout = setTimeout(
      () => reject(new RequestTimeoutError()),
      this.timeoutInSeconds * 1000,
    );
  }
}
