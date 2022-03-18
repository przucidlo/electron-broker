import { BrokerClient, TransformableBrokerClient } from '../../..';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class BrokerClientComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.container.bind(BrokerClient).to(BrokerClient).inTransientScope();
    this.container
      .bind(TransformableBrokerClient)
      .to(TransformableBrokerClient)
      .inTransientScope();
  }
}
