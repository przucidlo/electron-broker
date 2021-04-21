import { Container } from 'inversify';
import { Symbols } from '../../constants/symbols';
import { ModuleConfig } from '../../types/ipc-module-config.type';
import { AbstractContainerComposer } from './abstract-container-composer';

export abstract class ContainerConfiguarableComposer extends AbstractContainerComposer {
  protected config: ModuleConfig;

  constructor(container: Container) {
    super(container);

    this.config = container.get(Symbols.IpcModuleConfig);
  }
}
