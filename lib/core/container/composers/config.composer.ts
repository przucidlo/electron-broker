import { Container } from 'inversify';
import { Symbols } from '../../constants/symbols';
import ProcessTypeUnsupportedModeError from '../../errors/process-type-unsupported-mode.error';
import { ModuleConfig } from '../../types/module-config.type';
import { AbstractContainerComposer } from '../abstract/abstract-container-composer';

export class ConfigComposer extends AbstractContainerComposer {
  constructor(container: Container, private config: ModuleConfig) {
    super(container);
  }

  public compose(): void {
    this.fillOptionalOptions();
    this.checkProcessModeSupport();

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

  private checkProcessModeSupport() {
    if (
      (process.type === 'browser' && this.config.mode === 'CLIENT') ||
      (process.type !== 'browser' && this.config.mode === 'BROKER')
    ) {
      throw new ProcessTypeUnsupportedModeError(this.config.mode);
    }
  }
}
