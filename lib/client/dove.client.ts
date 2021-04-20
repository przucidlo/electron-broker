import { inject, injectable } from 'inversify';
import { Middleware } from '..';
import { BROKER_EVENT } from '../constants/channels';
import { Symbols } from '../constants/symbols';
import { BrokerEventFactory } from '../helpers/broker-event.factory';
import { BrokerEvent } from '../interfaces/broker-event-data.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { ClassType } from '../types/class.type';
import { ClientExecutionContextFactory } from '../types/client-execution-context-factory.type';
import { MiddlewareExecutorFactory } from '../types/middleware-executor-factory.type';
import { BrokerEventSubscriber } from './event-subscriber/broker-event-subscriber';
import { BrokerResponseListener } from './response-listener/broker-response-listener';

@injectable()
export default class DoveClient {
  private middleware: (ClassType<Middleware> | Middleware)[];

  constructor(
    @inject(Symbols.IpcTransport) private ipcTransport: IpcTransport,
    @inject(Symbols.MiddlewareExecutorFactory) private middlewareExecutorFactory: MiddlewareExecutorFactory,
    @inject(Symbols.ClientExecutionContextFactory) private executionContextFactory: ClientExecutionContextFactory,
  ) {
    this.middleware = [];
  }

  public subscribe<T>(
    pattern: string,
    listener: (data: T, brokerEventData?: BrokerEvent) => void,
  ): BrokerEventSubscriber {
    return new BrokerEventSubscriber(pattern, (event) => {
      listener(<T>event.data, event);
    });
  }

  public send(pattern: string, data: unknown): void {
    const brokerEvent: BrokerEvent = BrokerEventFactory.createBrokerEvent(pattern, data);
    const middlewareExecutor = this.middlewareExecutorFactory(this.middleware);
    const executionContext = this.executionContextFactory(brokerEvent);

    middlewareExecutor.executeWithoutResponse(executionContext, () => {
      this.ipcTransport.send(BROKER_EVENT, brokerEvent);
    });
  }

  public async invoke<T>(pattern: string, data: unknown): Promise<T> {
    const brokerEvent: BrokerEvent = BrokerEventFactory.createBrokerEvent(pattern, data);
    const middlewareExecutor = this.middlewareExecutorFactory(this.middleware);
    const executionContext = this.executionContextFactory(brokerEvent);

    return <T>await middlewareExecutor.execute(executionContext, async () => {
      this.ipcTransport.send(BROKER_EVENT, brokerEvent);

      return await this.listenForResponse(brokerEvent);
    });
  }

  private async listenForResponse<T>(brokerEvent: BrokerEvent): Promise<T> {
    const brokerResponseListener = new BrokerResponseListener(brokerEvent);

    return <T>(await brokerResponseListener.listen()).data;
  }

  public setMiddleware(middlewares: (ClassType<Middleware> | Middleware)[]): void {
    this.middleware = middlewares;
  }
}
