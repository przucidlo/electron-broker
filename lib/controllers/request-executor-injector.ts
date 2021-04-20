import { inject, injectable } from 'inversify';
import { Symbols } from '../constants/symbols';
import { BrokerEvent } from '../interfaces/broker-event-data.interface';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { MessageHandler } from '../types/message-handler.type';
import { ExecutionContext } from './execution-context';
import { RequestExecutor } from './request-executor';
import { ExecutionContextFactory } from '../types/execution-context-factory.type';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import cloneDeep from 'lodash.clonedeep';

@injectable()
export class RequestExecutorInjector {
  constructor(
    @inject(Symbols.ExecutionContextFactory) private executorContextFactory: ExecutionContextFactory,
    @inject(Symbols.RequestExecutorFactory) private requestExecutorFactory: () => RequestExecutor,
  ) {}

  public injectIntoControllers(controllersMetadata: ControllerMetadata[]): void {
    for (const controllerMetadata of controllersMetadata) {
      this.wrapEndpointsWithExecutionContext(controllerMetadata.messageHandlers);
    }
  }

  private wrapEndpointsWithExecutionContext(messageHandlers: Record<string, ControllerHandlerMetadata>): void {
    for (const pattern of Object.keys(messageHandlers)) {
      const handlerMetadata = messageHandlers[pattern];

      handlerMetadata.handler = this.createAndWrapWithExecutionContext(cloneDeep(handlerMetadata));
    }
  }

  private createAndWrapWithExecutionContext(metadata: ControllerHandlerMetadata): MessageHandler {
    return async (data: BrokerEvent) => {
      if (this.isRequest(data)) {
        const requestExecutor: RequestExecutor = this.requestExecutorFactory() as RequestExecutor;
        const executionContext: ExecutionContext = this.executorContextFactory(metadata, data);

        requestExecutor.executeRequest(executionContext, metadata);
      }
    };
  }

  private isRequest(data: BrokerEvent): boolean {
    return data.type === 'REQUEST';
  }
}
