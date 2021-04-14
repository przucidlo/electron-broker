import { inject, injectable, multiInject } from 'inversify';
import { Symbols } from '../constants/symbols';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import Middleware from '../interfaces/middleware.interface';
import { ClassType } from '../types/class.type';
import { MiddlewareExecutorFactory } from '../types/middleware-executor-factory.type';
import { ExecutionContext } from './execution-context';
import { HandlerParamsMapper } from './handler-params-mapper';

@injectable()
export class RequestExecutor {
  constructor(
    @multiInject(Symbols.InternalMiddleware) private internalMiddleware: (ClassType<Middleware> | Middleware)[],
    @inject(Symbols.GlobalMiddleware) private globalMiddleware: (ClassType<Middleware> | Middleware)[],
    @inject(Symbols.MiddlewareExecutorFactory) private middlewareExecutorFactory: MiddlewareExecutorFactory,
    private paramsMapper: HandlerParamsMapper,
  ) {}

  public async executeRequest(context: ExecutionContext, metadata: ControllerHandlerMetadata): Promise<void> {
    const middlewareExecutor = this.middlewareExecutorFactory([
      ...this.internalMiddleware,
      ...this.globalMiddleware,
      ...metadata.middleware,
    ]);

    await middlewareExecutor.executeOnRequest(context);

    const result = await this.executeHandler(context, metadata);

    await middlewareExecutor.executeOnResponse(result);
  }

  private async executeHandler(context: ExecutionContext, metadata: ControllerHandlerMetadata): Promise<unknown> {
    const paramsValues = this.paramsMapper.mapBrokerEventData(metadata.paramsMetadata, context.brokerEventData);

    return await context.getHandler()(...paramsValues);
  }
}
