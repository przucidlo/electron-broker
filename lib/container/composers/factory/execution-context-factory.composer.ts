import { Symbols } from '../../../constants/symbols';
import { BrokerEvent } from '../../../interfaces/broker-event.interface';
import { ControllerHandlerMetadata } from '../../../interfaces/controller-handler-metadata.interface';
import { ExecutionContext } from '../../../controllers/execution-context';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';
import { ClientExecutionContextFactory } from '../../../types/client-execution-context-factory.type';

export class ExecutionContextFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindExecutionContextFactory();
    this.bindClientExecutionContextFactory();
  }

  private bindExecutionContextFactory() {
    this.container.bind(Symbols.ExecutionContextFactory).toFactory(() => {
      return (metadata: ControllerHandlerMetadata, data: BrokerEvent) => {
        const executionContext = new ExecutionContext(metadata, data);

        return executionContext;
      };
    });
  }

  private bindClientExecutionContextFactory() {
    this.container.bind(Symbols.ClientExecutionContextFactory).toFactory(
      (): ClientExecutionContextFactory => {
        return (brokerEvent) => {
          const executionContext = new ExecutionContext(undefined, brokerEvent);

          return executionContext;
        };
      },
    );
  }
}
