import { Container } from 'inversify';
import { Symbols } from '../../constants/symbols';
import { BrokerEventData } from '../../interfaces/broker-event-data.interface';
import { ControllerMetadata } from '../../interfaces/controller-metadata.interface';
import { MiddlewareContext } from '../../middleware/middleware-context';
import { MiddlewareExecutor } from '../../middleware/middleware-executor';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

type MessageHandler = (...args: any[]) => any;

export default class ControllerMiddlewareComposer extends ContainerConfiguarableComposer {
  constructor(container: Container) {
    super(container);

    this.container.bind(Symbols.MiddlewareContext).to(MiddlewareContext).inRequestScope();
  }

  public compose(): void {
    if (this.isModuleUsingControllers()) {
      const controllersMetadata: ControllerMetadata[] = this.container.get(Symbols.ControllerMetadata);

      for (const controllerMetadata of controllersMetadata) {
        controllerMetadata.messageHandlers = this.injectContextTriggerIntoEndpoints(controllerMetadata.messageHandlers);
      }

      this.container.rebind(Symbols.ControllerMetadata).toConstantValue(controllersMetadata);
    }
  }

  private injectContextTriggerIntoEndpoints(messageHandlers: Record<string, any>): Record<string, any> {
    const messageHandlersWithContext: Record<string, any> = {};

    for (const messageHandlerKey of Object.keys(messageHandlers)) {
      messageHandlersWithContext[messageHandlerKey] = this.createContextAndExecuteIt(
        messageHandlers[messageHandlerKey],
      );
    }

    return messageHandlersWithContext;
  }

  private createContextAndExecuteIt(messageHandler: MessageHandler): MessageHandler {
    return async (data: BrokerEventData) => {
      if (this.isRequest(data)) {
        const middlewareContext: MiddlewareContext = this.container.get(Symbols.MiddlewareContext);
        const middlewareExecutor: MiddlewareExecutor = this.container.get(Symbols.MiddlewareExecutor);

        middlewareContext.args = data;
        middlewareContext.messageHandler = messageHandler;

        middlewareExecutor.executeMiddlewareContext(middlewareContext);
      }
    };
  }

  private isRequest(data: BrokerEventData): boolean {
    return data.type === 'REQUEST';
  }
}
