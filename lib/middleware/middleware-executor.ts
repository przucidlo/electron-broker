import { injectable, multiInject } from 'inversify';
import { Symbols } from '../constants/symbols';
import { Middleware } from '../interfaces/middleware.interface';
import { ExecutionContext } from './execution-context';

@injectable()
export class MiddlewareExecutor {
  constructor(@multiInject(Symbols.IpcMiddleware) private ipcMiddlewares: Middleware[]) {}

  public async executeMiddlewareContext(context: ExecutionContext): Promise<void> {
    for (const middleware of this.ipcMiddlewares) {
      if (middleware.onRequest) {
        await middleware.onRequest(context);
      }
    }

    const result = await context.getHandler()(context.brokerEventData.data);

    for (const middleware of this.ipcMiddlewares.reverse()) {
      if (middleware.onResponse) {
        middleware.onResponse(result);
      }
    }
  }
}
