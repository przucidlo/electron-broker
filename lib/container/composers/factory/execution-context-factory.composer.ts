import { Symbols } from '../../../constants/symbols';
import { BrokerEventData } from '../../../interfaces/broker-event-data.interface';
import { ControllerHandlerMetadata } from '../../../interfaces/controller-handler-metadata.interface';
import { ExecutionContext } from '../../../controllers/execution-context';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class ExecutionContextFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindExecutionContextFactory();
    this.bindClientExecutionContextFactory();
  }

  private bindExecutionContextFactory() {
    this.container.bind(Symbols.ExecutionContextFactory).toFactory(() => {
      return (metadata: ControllerHandlerMetadata, data: BrokerEventData) => {
        const executionContext = new ExecutionContext(metadata.controller, metadata.handler, data);

        return executionContext;
      };
    });
  }

  private bindClientExecutionContextFactory() {
    this.container.bind(Symbols.ClientExecutionContextFactory).toFactory(() => {
      return (brokerEvent) => {
        const executionContext = new ExecutionContext(undefined, undefined, brokerEvent);

        return executionContext;
      };
    });
  }
}
