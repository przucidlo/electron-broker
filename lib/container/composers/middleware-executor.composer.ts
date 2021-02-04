import { Symbols } from '../../constants/symbols';
import { MiddlewareExecutor } from '../../middleware/middleware-executor';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class MiddlewareExecutorComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    if (this.isModuleUsingControllers()) {
      this.container.bind(Symbols.MiddlewareExecutor).to(MiddlewareExecutor).inRequestScope();
    }
  }
}
