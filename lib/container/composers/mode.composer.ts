import { DoveMode } from '../../constants/dove-mode.enum';
import { Symbols } from '../../constants/symbols';
import { BrokerMode } from '../../modes/broker.mode';
import { ClientMode } from '../../modes/client.mode';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class ModeComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    switch (this.config.mode) {
      case DoveMode.PROCESS:
        this.container.bind(Symbols.ModuleMode).to(ClientMode).inSingletonScope();
        break;
      case DoveMode.RENDERER:
        this.container.bind(Symbols.ModuleMode).to(ClientMode).inSingletonScope();
        break;
      case DoveMode.BROKER:
        this.container.bind(Symbols.ModuleMode).to(BrokerMode).inSingletonScope();
        break;
      default:
        throw new Error('Missing ModuleMode implementation for provided IpcMode');
    }
  }
}
