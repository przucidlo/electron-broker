import { inject, injectable } from 'inversify';
import { Middleware } from '..';
import { BROKER_EVENT } from '../constants/channels';
import { Symbols } from '../constants/symbols';
import ExecutionContext from '../controllers/execution-context';
import { BrokerEventFactory } from '../helpers/broker-event.factory';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { MiddlewareExecutor } from '../middleware/middleware-executor';
import { BrokerResponseListenerFactory } from '../types/broker-responser-listener-factory.type';
import { ClassType } from '../types/class.type';
import { ClientExecutionContextFactory } from '../types/client-execution-context-factory.type';
import { MiddlewareExecutorFactory } from '../types/middleware-executor-factory.type';
import { BrokerEventSubscriber } from './event-subscriber/broker-event-subscriber';
import { BrokerResponseListener } from './response-listener/broker-response-listener';

type MiddlewareContext = { middlewareExecutor: MiddlewareExecutor; executionContext: ExecutionContext };

@injectable()
export default class DoveClient {
  private middleware: (ClassType<Middleware> | Middleware)[];

  constructor(
    @inject(Symbols.IpcTransport) private ipcTransport: IpcTransport,
    @inject(Symbols.MiddlewareExecutorFactory) private middlewareExecutorFactory: MiddlewareExecutorFactory,
    @inject(Symbols.ClientExecutionContextFactory) private executionContextFactory: ClientExecutionContextFactory,
    @inject(Symbols.BrokerResponseListenerFactory) private brokerResponseListenerFactory: BrokerResponseListenerFactory,
  ) {
    this.middleware = [];
  }

  public setMiddleware(middlewares: (ClassType<Middleware> | Middleware)[]): void {
    this.middleware = middlewares;
  }

  public subscribe<T>(pattern: string, listener: (data: T, brokerEvent?: BrokerEvent) => void): BrokerEventSubscriber {
    return new BrokerEventSubscriber(pattern, (event) => {
      listener(<T>event.data, event);
    });
  }

  public send(pattern: string, data: unknown): void {
    const { middlewareExecutor, executionContext } = this.prepareMiddlewareContext(pattern, data);

    middlewareExecutor.executeWithoutResponse(executionContext, () => {
      this.ipcTransport.send(BROKER_EVENT, executionContext.brokerEvent);
    });
  }

  public async invoke<T>(pattern: string, data: unknown): Promise<T> {
    return <T>(await this.invokeForBrokerEvent(pattern, data)).data;
  }

  public async invokeForBrokerEvent(pattern: string, data: unknown): Promise<BrokerEvent> {
    const { middlewareExecutor, executionContext } = this.prepareMiddlewareContext(pattern, data);

    return <BrokerEvent>await middlewareExecutor.execute(executionContext, async () => {
      this.ipcTransport.send(BROKER_EVENT, executionContext.brokerEvent);

      return await this.listenForResponse(executionContext.brokerEvent);
    });
  }

  private prepareMiddlewareContext(pattern: string, data: unknown): MiddlewareContext {
    const brokerEvent: BrokerEvent = BrokerEventFactory.createBrokerEvent(pattern, data);
    const middlewareExecutor = this.middlewareExecutorFactory(this.middleware);
    const executionContext = this.executionContextFactory(brokerEvent);

    return { middlewareExecutor, executionContext };
  }

  private async listenForResponse(brokerEvent: BrokerEvent): Promise<BrokerEvent> {
    return await this.brokerResponseListenerFactory(brokerEvent).listen();
  }
}
