import { Container } from 'inversify';
import { DoveMode } from '../../constants/dove-mode.enum';
import { Symbols } from '../../constants/symbols';
import { ModuleConfig } from '../../types/ipc-module-config.type';
import { AbstractContainerComposer } from './abstract-container-composer';

export abstract class ContainerConfiguarableComposer extends AbstractContainerComposer {
  protected config: ModuleConfig;

  constructor(container: Container) {
    super(container);

    this.config = this.getConfig();
  }

  protected isModuleUsingControllers(): boolean {
    return this.config.mode === DoveMode.RENDERER || this.config.mode === DoveMode.PROCESS;
  }

  private getConfig(): ModuleConfig {
    return this.container.get(Symbols.IpcModuleConfig);
  }
}
