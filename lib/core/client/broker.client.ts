import { inject, injectable } from 'inversify';
import { BROKER_EVENT } from '../constants/channels';
import { Symbols } from '../constants/symbols';
import { BrokerEventFactory } from '../helpers/broker-event.factory';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { ResponseListenerFactory } from '../types/response-listener-factory.type';
import { BrokerEventSubscriber } from './event-subscriber/broker-event-subscriber';
import { BrokerEventSubscriberFactory } from '../types/broker-event-subscriber-factory.type';
import { Message } from '../types/message.type';

@injectable()
export default class BrokerClient {
  private timeoutInSeconds: number;

  constructor(
    @inject(Symbols.IpcTransport) private ipcTransport: IpcTransport,
    @inject(Symbols.ResponseListenerFactory)
    private brokerResponseListenerFactory: ResponseListenerFactory,
    @inject(Symbols.ClientSubscriberFactory)
    private subscriberFactory: BrokerEventSubscriberFactory,
  ) {}

  public send<M extends Message<string, unknown, void>>(
    pattern: M['pattern'],
    data: M['data'],
  ): void {
    const brokerEvent = BrokerEventFactory.createBrokerEvent(pattern, data);

    this.ipcTransport.send(BROKER_EVENT, brokerEvent);
  }

  public async invoke<M extends Message<string, unknown, unknown>>(
    pattern: M['pattern'],
    data: M['data'],
  ): Promise<M['response']> {
    const brokerEvent = BrokerEventFactory.createBrokerEvent(pattern, data);

    this.ipcTransport.send(BROKER_EVENT, brokerEvent);

    const response = await this.brokerResponseListenerFactory(
      brokerEvent,
      this.timeoutInSeconds,
    ).listen<M['response']>();

    return response.data;
  }

  public subscribe<M extends Message<string, unknown, unknown>>(
    pattern: M['pattern'],
    listener: (
      data: M['data'],
      brokerEvent?: BrokerEvent<M['response']>,
    ) => void,
  ): BrokerEventSubscriber {
    return this.subscriberFactory(
      pattern,
      (event: BrokerEvent<M['response']>) => {
        listener(event.data, event);
      },
    );
  }

  public setTimeout(timeoutInSeconds: number): void {
    this.timeoutInSeconds = timeoutInSeconds;
  }
}
