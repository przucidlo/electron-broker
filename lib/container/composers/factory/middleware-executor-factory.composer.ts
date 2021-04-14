import { Symbols } from '../../../constants/symbols';
import { MiddlewareExecutor } from '../../../middleware/middleware-executor';
import { MiddlewareExecutorFactory } from '../../../types/middleware-executor-factory.type';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class MiddlewareExecutorFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindMiddlewareExecutorFactory();
  }

  private bindMiddlewareExecutorFactory(): void {
    this.container.bind(Symbols.MiddlewareExecutorFactory).toFactory(
      (): MiddlewareExecutorFactory => {
        return (middlewares) => {
          return new MiddlewareExecutor(middlewares);
        };
      },
    );
  }
}
