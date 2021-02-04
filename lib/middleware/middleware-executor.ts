import { injectable, multiInject } from 'inversify';
import { Symbols } from '../constants/symbols';
import { IpcMiddleware } from '../interfaces/ipc-middleware.interface';
import { MiddlewareContext } from './middleware-context';

@injectable()
export class MiddlewareExecutor {
  constructor(@multiInject(Symbols.IpcMiddleware) private ipcMiddlewares: IpcMiddleware[]) {}

  public async executeMiddlewareContext(middlewareContext: MiddlewareContext): Promise<void> {
    const context: MiddlewareContext = middlewareContext;

    for (const middleware of this.ipcMiddlewares) {
      if (middleware.onRequest) {
        context.args = await middleware.onRequest(context.args);
      }
    }

    const result = await context.messageHandler(context.args);

    for (const middleware of this.ipcMiddlewares.reverse()) {
      if (middleware.onResponse) {
        middleware.onResponse(result);
      }
    }
  }
}
