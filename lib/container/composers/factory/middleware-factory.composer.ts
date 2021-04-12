import { injectable } from 'inversify';
import { Symbols } from '../../../constants/symbols';
import { Middleware } from '../../../interfaces/middleware.interface';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

@injectable()
export class MiddlewareFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindMiddlewareFactory();
  }

  private bindMiddlewareFactory() {
    this.container.bind(Symbols.MiddlewareFactory).toFactory((context) => {
      return (middleware: new (...args: any[]) => Middleware) => {
        return context.container.get(middleware);
      };
    });
  }
}
