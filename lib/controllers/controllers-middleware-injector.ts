import { inject, injectable } from 'inversify';
import { Symbols } from '../constants/symbols';
import { BrokerEventData } from '../interfaces/broker-event-data.interface';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { MessageHandler } from '../types/message-handler.type';
import { MiddlewareContext } from '../middleware/middleware-context';
import { MiddlewareExecutor } from '../middleware/middleware-executor';
import { MiddlewareContextFactory } from '../types/middleware-context-factory.type';

@injectable()
export class ControllersMiddlewareInjector {
  constructor(
    @inject(Symbols.MiddlewareContextFactory) private middlewareContextFactory: MiddlewareContextFactory,
    @inject(Symbols.MiddlewareExecutorFactory) private middlewareExecutorFactory: () => MiddlewareExecutor,
  ) {}

  public inject(controllersMetadata: ControllerMetadata[]): void {
    for (const controllerMetadata of controllersMetadata) {
      controllerMetadata.messageHandlers = this.wrapEndpointsWithMiddlewareContext(controllerMetadata.messageHandlers);
    }
  }

  private wrapEndpointsWithMiddlewareContext(messageHandlers: Record<string, any>): Record<string, any> {
    const messageHandlersWithContext: Record<string, any> = {};

    for (const messageHandlerKey of Object.keys(messageHandlers)) {
      messageHandlersWithContext[messageHandlerKey] = this.createAndWrapWithMiddlewareContext(
        messageHandlers[messageHandlerKey],
      );
    }

    return messageHandlersWithContext;
  }

  private createAndWrapWithMiddlewareContext(messageHandler: MessageHandler): MessageHandler {
    return async (data: BrokerEventData) => {
      if (this.isRequest(data)) {
        const middlewareExecutor: MiddlewareExecutor = this.middlewareExecutorFactory() as MiddlewareExecutor;
        const middlewareContext: MiddlewareContext = this.middlewareContextFactory(messageHandler, data);

        middlewareExecutor.executeMiddlewareContext(middlewareContext);
      }
    };
  }

  private isRequest(data: BrokerEventData): boolean {
    return data.type === 'REQUEST';
  }
}
