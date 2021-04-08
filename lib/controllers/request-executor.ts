import { injectable, multiInject } from 'inversify';
import { Symbols } from '../constants/symbols';
import { Middleware } from '../interfaces/middleware.interface';
import { ExecutionContext } from './execution-context';
import { HandlerParamsMapper } from './handler-params-mapper';

@injectable()
export class RequestExecutor {
  constructor(
    @multiInject(Symbols.IpcMiddleware) private ipcMiddlewares: Middleware[],
    private paramsMapper: HandlerParamsMapper,
  ) {}

  public async executeRequest(context: ExecutionContext): Promise<void> {
    for (const middleware of this.ipcMiddlewares) {
      if (middleware.onRequest) {
        await middleware.onRequest(context);
      }
    }

    const paramsValues = this.paramsMapper.mapBrokerEventData(context.getParamsMetadata(), context.brokerEventData);

    const result = await context.getHandler()(...paramsValues);

    for (const middleware of this.ipcMiddlewares.reverse()) {
      if (middleware.onResponse) {
        middleware.onResponse(result);
      }
    }
  }
}
