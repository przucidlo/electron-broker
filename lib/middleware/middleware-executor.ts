import { injectable, multiInject } from 'inversify';
import { Symbols } from '../constants/symbols';
import { Middleware } from '../interfaces/middleware.interface';
import { ExecutionContext } from './execution-context';

@injectable()
export class MiddlewareExecutor {
  constructor(@multiInject(Symbols.IpcMiddleware) private ipcMiddlewares: Middleware[]) {}

  public async executeMiddlewareContext(middlewareContext: ExecutionContext): Promise<void> {
    const context: ExecutionContext = middlewareContext;

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
