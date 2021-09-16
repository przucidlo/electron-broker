import { Mode } from '../../constants/mode.enum';
import { Symbols } from '../../constants/symbols';
import { BrokerMode } from '../../modes/broker.mode';
import { ClientMode } from '../../modes/client.mode';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class ModeComposer extends ContainerConfiguarableComposer {
  public compose(): void {
    switch (this.config.mode) {
      case Mode.CLIENT:
        this.container
          .bind(Symbols.ModuleMode)
          .to(ClientMode)
          .inSingletonScope();
        break;
      case Mode.BROKER:
        this.container
          .bind(Symbols.ModuleMode)
          .to(BrokerMode)
          .inSingletonScope();
        break;
      default:
        throw new Error(
          'ModuleMode implementation for selected mode does not exists',
        );
    }
  }
}
