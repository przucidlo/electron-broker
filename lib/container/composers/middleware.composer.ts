import { Symbols } from '../../constants/symbols';
import { BrokerEventData } from '../../interfaces/broker-event-data.interface';
import { Middleware } from '../../interfaces/middleware.interface';
import { MessageHandler } from '../../types/message-handler.type';
import { PayloadMiddleware } from '../../middleware/internal/payload.middleware';
import { ResultBroadcastMiddleware } from '../../middleware/internal/result-broadcast.middleware';
import { ExecutionContext } from '../../middleware/execution-context';
import { MiddlewareExecutor } from '../../middleware/middleware-executor';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';
import { ControllerHandlerMetadata } from '../../interfaces/controller-handler-metadata.interface';

export class MiddlewareComposer extends ContainerConfiguarableComposer {
  private static readonly INTERNAL_MIDDLEWARE_ORDER: (new (...any: any[]) => Middleware)[] = [
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
    this.container.bind(Symbols.ExecutionContextFactory).toFactory(() => {
      return (metadata: ControllerHandlerMetadata, data: BrokerEventData) => {
        const middlewareContext = new ExecutionContext(metadata, data);

        return middlewareContext;
      };
    });
  }
}
