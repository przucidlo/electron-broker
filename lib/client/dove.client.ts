import { inject, injectable } from 'inversify';
import { Symbols } from '../constants/symbols';
import { BrokerEventConverter } from '../helpers/broker-event.converter';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { BrokerEventSubscriber } from './event-subscriber/broker-event-subscriber';
import { BrokerResponseListener } from './response-listener/broker-response-listener';
@injectable()
export default class DoveClient {
  constructor(@inject(Symbols.IpcTransport) private ipcTransport: IpcTransport) {}

  public send(pattern: string, data: unknown): void {
    const brokerEvent: BrokerEvent = BrokerEventConverter.createOrConvert(pattern, data);

    this.ipcTransport.send(brokerEvent.pattern, brokerEvent.data);
  }

  public async invoke<T>(pattern: string, data: unknown): Promise<T> {
    const brokerEvent: BrokerEvent = BrokerEventConverter.createOrConvert(pattern, data);

    this.ipcTransport.send(brokerEvent.pattern, brokerEvent.data);

    return await this.listenForResponse(brokerEvent);
  }

  private async listenForResponse<T>(brokerEvent: BrokerEvent): Promise<T> {
    const brokerResponseListener = new BrokerResponseListener(brokerEvent);

    return <T>(await brokerResponseListener.listen()).data;
  }

  public subscribe<T>(pattern: string, listener: (data: T) => void): BrokerEventSubscriber {
    return new BrokerEventSubscriber(pattern, (event) => {
      listener(<T>event.data);
    });
  }
}
