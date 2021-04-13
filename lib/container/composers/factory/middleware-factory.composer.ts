import { injectable } from 'inversify';
import { Symbols } from '../../../constants/symbols';
import { MiddlewareFactory } from '../../../types/middleware-factory.type';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

@injectable()
export class MiddlewareFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindMiddlewareFactory();
  }

  private bindMiddlewareFactory() {
    this.container.bind(Symbols.MiddlewareFactory).toFactory(
      (context): MiddlewareFactory => {
        return (middleware) => {
          if (typeof middleware === 'object') {
            return middleware;
          }

          try {
            return context.container.get(middleware);
          } catch (err) {
            return Object.create(middleware.prototype);
          }
        };
      },
    );
  }
}
