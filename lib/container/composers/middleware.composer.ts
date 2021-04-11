import { Symbols } from '../../constants/symbols';
import { Middleware } from '../../interfaces/middleware.interface';
import { ResultBroadcastMiddleware } from '../../middleware/internal/result-broadcast.middleware';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class MiddlewareComposer extends ContainerConfiguarableComposer {
  private static readonly INTERNAL_MIDDLEWARE_ORDER: (new (...any: any[]) => Middleware)[] = [
    ResultBroadcastMiddleware,
  ];

  public compose(): void {
    this.bindInternalMiddleware();
  }

  private bindInternalMiddleware() {
    for (const middleware of MiddlewareComposer.INTERNAL_MIDDLEWARE_ORDER) {
      this.container.bind(Symbols.InternalMiddleware).to(middleware).inRequestScope();
    }
  }
}
