import { Symbols } from '../../constants/symbols';
import { Middleware } from '../../interfaces/middleware.interface';
import { PayloadMiddleware } from '../../middleware/internal/payload.middleware';
import { ResultBroadcastMiddleware } from '../../middleware/internal/result-broadcast.middleware';
import { MiddlewareExecutor } from '../../middleware/middleware-executor';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class MiddlewareComposer extends ContainerConfiguarableComposer {
  private static readonly INTERNAL_MIDDLEWARE_ORDER: (new (...any: any[]) => Middleware)[] = [
    ResultBroadcastMiddleware,
    PayloadMiddleware,
  ];

  public compose(): void {
    this.bindMiddlewareExecutor();
    this.bindInternalMiddleware();
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
}
