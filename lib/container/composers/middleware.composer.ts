import { Symbols } from '../../constants/symbols';
import { BrokerEventData } from '../../interfaces/broker-event-data.interface';
import { IpcMiddleware } from '../../interfaces/ipc-middleware.interface';
import { MessageHandler } from '../../types/message-handler.type';
import { PayloadMiddleware } from '../../middleware/internal/payload.middleware';
import { ResultBroadcastMiddleware } from '../../middleware/internal/result-broadcast.middleware';
import { MiddlewareContext } from '../../middleware/middleware-context';
import { MiddlewareExecutor } from '../../middleware/middleware-executor';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class MiddlewareComposer extends ContainerConfiguarableComposer {
  private static readonly INTERNAL_MIDDLEWARE_ORDER: (new (...any: any[]) => IpcMiddleware)[] = [
    ResultBroadcastMiddleware,
    PayloadMiddleware,
  ];

  public compose(): void {
    this.bindMiddlewareExecutor();
    this.bindInternalMiddleware();
    this.bindMiddlewareContext();
  }

  private bindMiddlewareExecutor() {
    this.container.bind(MiddlewareExecutor).to(MiddlewareExecutor).inRequestScope();
    this.container.bind(Symbols.MiddlewareExecutorFactory).toAutoFactory(MiddlewareExecutor);
  }

  private bindInternalMiddleware() {
    for (const middleware of MiddlewareComposer.INTERNAL_MIDDLEWARE_ORDER) {
      this.container.bind(Symbols.IpcMiddleware).to(middleware).inRequestScope();
    }
  }

  private bindMiddlewareContext() {
    this.container.bind(Symbols.MiddlewareContextFactory).toFactory(() => {
      return (messageHandler: MessageHandler, data: BrokerEventData) => {
        const middlewareContext = new MiddlewareContext();

        middlewareContext.messageHandler = messageHandler;
        middlewareContext.args = data;

        return middlewareContext;
      };
    });
  }
}
