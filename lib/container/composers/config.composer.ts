import { Container } from 'inversify';
import { Symbols } from '../../constants/symbols';
import { ModuleConfig } from '../../types/ipc-module-config.type';
import { AbstractContainerComposer } from '../abstract/abstract-container-composer';

export class ConfigComposer extends AbstractContainerComposer {
  constructor(container: Container, private config: ModuleConfig) {
    super(container);
  }

  public compose(): void {
    this.fillOptionalOptions();

    this.container.bind(Symbols.IpcModuleConfig).toConstantValue(this.config);
  }

  private fillOptionalOptions(): void {
    this.fillControllersIfNotProvided();
  }

  private fillControllersIfNotProvided(): void {
    if (!this.config.controllers) {
      this.config.controllers = [];
    }
  }
}
