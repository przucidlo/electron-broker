import { inject, injectable, multiInject } from 'inversify';
import { Symbols } from '../constants/symbols';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import Middleware from '../interfaces/middleware.interface';
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

  public async executeRequest(context: ExecutionContext, metadata: ControllerHandlerMetadata): Promise<void> {
    const middlewares = this.createMiddlewaresObjects([...this.internalMiddleware, ...metadata.middleware]);

    for (const middleware of middlewares) {
      if (middleware.onRequest) {
        await middleware.onRequest(context);
      }
    }

    let result = await this.executeHandler(context, metadata);

    for (const middleware of middlewares.reverse()) {
      if (middleware.onResponse) {
        result = await middleware.onResponse(result);
      }
    }
  }

  private createMiddlewaresObjects(middlewares: (ClassType<Middleware> | Middleware)[]): Middleware[] {
    const middlewareObjects: Middleware[] = [];

    for (const middleware of middlewares) {
      middlewareObjects.push(this.middlewareFactory(middleware));
    }

    return middlewareObjects;
  }

  private async executeHandler(context: ExecutionContext, metadata: ControllerHandlerMetadata): Promise<unknown> {
    const paramsValues = this.paramsMapper.mapBrokerEventData(metadata.paramsMetadata, context.brokerEventData);

    return await context.getHandler()(...paramsValues);
  }
}
