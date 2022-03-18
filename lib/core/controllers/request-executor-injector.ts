import { inject, injectable } from 'inversify';
import { Symbols } from '../constants/symbols';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { MessageHandler } from '../types/message-handler.type';
import { ExecutionContext } from './execution-context';
import { RequestExecutor } from './request-executor';
import { ExecutionContextFactory } from '../types/execution-context-factory.type';
import { ControllerHandlerMetadata } from '../interfaces/controller-handler-metadata.interface';
import { MessageHandlerWithPattern } from '../interfaces/message-handler-with-pattern.interface';

@injectable()
export class RequestExecutorInjector {
  constructor(
    @inject(Symbols.ExecutionContextFactory)
    private executorContextFactory: ExecutionContextFactory,
    @inject(Symbols.RequestExecutorFactory)
    private requestExecutorFactory: () => RequestExecutor,
  ) {}

  public injectIntoControllersHandlers(
    controllersMetadata: ControllerMetadata[],
  ): MessageHandlerWithPattern[] {
    const registrableMessageHandlers: MessageHandlerWithPattern[] = [];

    for (const controllerMetadata of controllersMetadata) {
      const messageHandlersWithPattern = this.wrapHandlersWithExecutionContext(
        controllerMetadata.messageHandlers,
      );

      registrableMessageHandlers.push(...messageHandlersWithPattern);
    }

    return registrableMessageHandlers;
  }

  private wrapHandlersWithExecutionContext(
    messageHandlers: Record<string, ControllerHandlerMetadata>,
  ): MessageHandlerWithPattern[] {
    const registrableMessageHandlers: MessageHandlerWithPattern[] = [];

    for (const pattern of Object.keys(messageHandlers)) {
      const handlerMetadata = messageHandlers[pattern];

      const handler = this.createAndWrapWithExecutionContext(handlerMetadata);

      registrableMessageHandlers.push({ pattern, handler });
    }

    return registrableMessageHandlers;
  }

  private createAndWrapWithExecutionContext(
    metadata: ControllerHandlerMetadata,
  ): MessageHandler {
    return async (data: BrokerEvent) => {
      if (this.isRequest(data)) {
        const requestExecutor: RequestExecutor = this.requestExecutorFactory();
        const executionContext: ExecutionContext = this.executorContextFactory(
          metadata,
          data,
        );

        requestExecutor.executeRequest(executionContext, metadata);
      }
    };
  }

  private isRequest(data: BrokerEvent): boolean {
    return data.type === 'REQUEST';
  }
}
