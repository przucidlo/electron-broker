import { RequestTimeoutError } from '../../errors/request-timeout.error';
import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { BrokerEventListener } from '../../types/broker-event-listener.type';
import { ListenerBrokerEventFilter } from '../listener-broker-event-filter/broker-listener-event-filter';
import { IpcListener } from './ipc-listener';

export class ResponseListener {
  private readonly PROMISE_TIMEOUT: number = 30;
  private timeout: NodeJS.Timeout;

  constructor(
    private brokerEvent: BrokerEvent,
    private listener: IpcListener,
  ) {}

  public async listen(): Promise<BrokerEvent> {
    try {
      return await new Promise((resolve, reject) => {
        this.listener.listen(
          this.brokerEvent.pattern,
          this.createResponseListener(resolve, reject),
        );

        this.setResponseTimeout(reject);
      });
    } catch (err) {
      throw err;
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
      this.PROMISE_TIMEOUT * 1000,
    );
  }
}
