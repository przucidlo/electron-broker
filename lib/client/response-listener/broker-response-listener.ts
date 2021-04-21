import { RequestTimeoutError } from '../../errors/request-timeout.error';
import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { ListenerFactory } from '../listener-adapter/factory/listener-factory';
import { ListenerAdapter } from '../listener-adapter/listener-adapter.interface';

type BrokerListener = (response: BrokerEvent) => void;

export class BrokerResponseListener {
  private readonly PROMISE_TIMEOUT: number = 30;
  private listenerAdapter: ListenerAdapter;
  private timeout: NodeJS.Timeout;

  constructor(private brokerEvent: BrokerEvent) {
    this.listenerAdapter = ListenerFactory.createListener();
  }

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
      this.listenerAdapter.listen(this.brokerEvent.pattern, this.createResponseListener(resolve));

      this.setResponseTimeout(reject);
    });
  }

  private createResponseListener(resolve: (value?: unknown) => void): BrokerListener {
    return (response) => {
      if (this.isExpectedResponse(response)) {
        resolve(response);
      }
    };
  }

  private isExpectedResponse(response: BrokerEvent): boolean {
    return response.eventId === this.brokerEvent.eventId && response.type === 'RESPONSE';
  }

  private setResponseTimeout(reject: (reason: any) => void) {
    this.timeout = setTimeout(() => reject(new RequestTimeoutError()), this.PROMISE_TIMEOUT * 1000);
  }
}
