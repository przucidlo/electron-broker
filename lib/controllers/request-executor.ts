import { inject, injectable, multiInject } from 'inversify';
import { Symbols } from '../constants/symbols';
import { Middleware } from '../interfaces/middleware.interface';
import { ClassType } from '../types/class.type';
import { MiddlewareFactory } from '../types/middleware-factory.type';
import { ExecutionContext } from './execution-context';
import { HandlerParamsMapper } from './handler-params-mapper';

@injectable()
export class RequestExecutor {
  constructor(
    @multiInject(Symbols.InternalMiddleware) private internalMiddleware: ClassType<Middleware>[],
    private paramsMapper: HandlerParamsMapper,
    @inject(Symbols.MiddlewareFactory) private middlewareFactory: MiddlewareFactory,
  ) {}

  public async executeRequest(context: ExecutionContext): Promise<void> {
    const middlewares = this.createMiddlewaresObjects(this.internalMiddleware);

    for (const middleware of middlewares) {
      if (middleware.onRequest) {
        await middleware.onRequest(context);
      }
    }

    const result = await this.executeHandler(context);

    for (const middleware of middlewares.reverse()) {
      if (middleware.onResponse) {
        middleware.onResponse(result);
      }
    }
  }

  private createMiddlewaresObjects(middlewares: ClassType<Middleware>[]): Middleware[] {
    const middlewareObjects: Middleware[] = [];

    for (const middleware of middlewares) {
      middlewareObjects.push(this.middlewareFactory(middleware));
    }

    return middlewareObjects;
  }

  private async executeHandler(context: ExecutionContext): Promise<unknown> {
    const paramsValues = this.paramsMapper.mapBrokerEventData(context.getParamsMetadata(), context.brokerEventData);

    return await context.getHandler()(...paramsValues);
  }
}
