import { DoveClient } from '../..';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class DoveClientComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.container.bind(DoveClient).to(DoveClient).inSingletonScope();
  }
}
