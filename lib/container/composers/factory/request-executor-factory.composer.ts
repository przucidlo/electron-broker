import { Symbols } from '../../../constants/symbols';
import { RequestExecutor } from '../../../controllers/request-executor';
import { ContainerConfiguarableComposer } from '../../abstract/container-configurable-composer';

export class RequestExecutorFactoryComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.bindRequestExecutorFactory();
  }

  private bindRequestExecutorFactory() {
    this.container.bind(RequestExecutor).to(RequestExecutor).inRequestScope();
    this.container.bind(Symbols.RequestExecutorFactory).toAutoFactory(RequestExecutor);
  }
}
