import { Container } from 'inversify';
import { Symbols } from '../../constants/symbols';
import { CommonConfig } from '../../interfaces/options/common-config.interface';
import { ModuleConfig } from '../../types/module-config.type';
import { AbstractContainerComposer } from './abstract-container-composer';

export abstract class ContainerConfiguarableComposer<
  C extends CommonConfig = ModuleConfig
> extends AbstractContainerComposer {
  protected config: C;

  constructor(container: Container) {
    super(container);

    this.config = container.get(Symbols.IpcModuleConfig);
  }
}
