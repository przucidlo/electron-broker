import { inject, injectable } from 'inversify';
import { Symbols } from '../constants/symbols';
import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { MessageHandler } from '../types/message-handler.type';
import { ExecutionContext } from './execution-context';
import { RequestExecutor } from '../middleware/request-executor';
import { MiddlewareContextFactory } from '../types/middleware-context-factory.type';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import cloneDeep from 'lodash.clonedeep';

@injectable()
export class ControllersMiddlewareInjector {
  constructor(
    @inject(Symbols.ExecutionContextFactory) private executorContextFactory: MiddlewareContextFactory,
    @inject(Symbols.RequestExecutorFactory) private requestExecutorFactory: () => RequestExecutor,
  ) {}

  public inject(controllersMetadata: ControllerMetadata[]): void {
    for (const controllerMetadata of controllersMetadata) {
      this.wrapEndpointsWithMiddlewareContext(controllerMetadata.messageHandlers);
    }
  }

  private wrapEndpointsWithMiddlewareContext(messageHandlers: Record<string, ControllerHandlerMetadata>): void {
    for (const pattern of Object.keys(messageHandlers)) {
      const handlerMetadata = messageHandlers[pattern];

      handlerMetadata.handler = this.createAndWrapWithMiddlewareContext(cloneDeep(handlerMetadata));
    }
  }

  private createAndWrapWithMiddlewareContext(metadata: ControllerHandlerMetadata): MessageHandler {
    return async (data: BrokerEventData) => {
      if (this.isRequest(data)) {
        const requestExecutor: RequestExecutor = this.requestExecutorFactory() as RequestExecutor;
        const executionContext: ExecutionContext = this.executorContextFactory(metadata, data);

        requestExecutor.executeRequest(executionContext);
      }
    };
  }

  private isRequest(data: BrokerEventData): boolean {
    return data.type === 'REQUEST';
  }
}
