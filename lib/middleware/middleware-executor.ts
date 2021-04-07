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
        context.brokerEventData = await middleware.onRequest(context.brokerEventData);
      }
    }

    const result = await context.getHandler()(context.brokerEventData);

    for (const middleware of this.ipcMiddlewares.reverse()) {
      if (middleware.onResponse) {
        middleware.onResponse(result);
      }
    }
  }
}
