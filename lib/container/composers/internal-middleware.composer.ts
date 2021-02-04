import { Symbols } from '../../constants/symbols';
import { IpcMiddleware } from '../../interfaces/ipc-middleware.interface';
import { PayloadMiddleware } from '../../middleware/internal/payload.middleware';
import { ResultBroadcastMiddleware } from '../../middleware/internal/result-broadcast.middleware';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class InternalMiddlewareComposer extends ContainerConfiguarableComposer {
  private static readonly INTERNAL_MIDDLEWARE_ORDER: (new (...any: any[]) => IpcMiddleware)[] = [
    ResultBroadcastMiddleware,
    PayloadMiddleware,
  ];

  public compose(): void {
    if (this.isModuleUsingControllers()) {
      this.bindMiddlewaresInRequestScope();
    }
  }

  private bindMiddlewaresInRequestScope(): void {
    for (let middleware of InternalMiddlewareComposer.INTERNAL_MIDDLEWARE_ORDER) {
      this.container.bind(Symbols.IpcMiddleware).to(middleware).inRequestScope();
    }
  }
}
