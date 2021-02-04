import { DoveMode } from '../../constants/dove-mode.enum';
import { Symbols } from '../../constants/symbols';
import { ModuleBrokerMode } from '../../modes/module-broker.mode';
import { ModuleProcessMode } from '../../modes/module-process.mode';
import { ModuleRendererMode } from '../../modes/module-renderer.mode';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class ModuleModeComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    switch (this.config.mode) {
      case DoveMode.PROCESS:
        this.container.bind(Symbols.ModuleMode).to(ModuleProcessMode);
        break;
      case DoveMode.RENDERER:
        this.container.bind(Symbols.ModuleMode).to(ModuleRendererMode);
        break;
      case DoveMode.BROKER:
        this.container.bind(Symbols.ModuleMode).to(ModuleBrokerMode);
        break;
      default:
        throw new Error('Missing ModuleMode implementation for provided IpcMode');
    }
  }
}
