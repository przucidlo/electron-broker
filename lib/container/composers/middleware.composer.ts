import { INTERNAL_MIDDLEWARE_ORDER } from '../../constants/internal-middleware-order';
import { Symbols } from '../../constants/symbols';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class MiddlewareComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindInternalMiddleware();
  }

  private bindInternalMiddleware() {
    for (const middleware of INTERNAL_MIDDLEWARE_ORDER) {
      this.container.bind(Symbols.InternalMiddleware).toConstantValue(middleware);
    }
  }
}
