import { DoveClient } from '../..';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class IpcClientComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    this.container.bind(DoveClient).to(DoveClient).inSingletonScope();
  }
}
