import { Symbols } from '../../../constants/symbols';
import { BrokerEventData } from '../../../interfaces/broker-event-data.interface';
import { ControllerHandlerMetadata } from '../../../interfaces/controller-handler-metadata.interface';
import { ExecutionContext } from '../../../controllers/execution-context';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class ExecutionContextFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindExecutionContextFactory();
  }

  private bindExecutionContextFactory() {
    this.container.bind(Symbols.ExecutionContextFactory).toFactory(() => {
      return (metadata: ControllerHandlerMetadata, data: BrokerEventData) => {
        const middlewareContext = new ExecutionContext(metadata.controller, metadata.handler, data);

        return middlewareContext;
      };
    });
  }
}
