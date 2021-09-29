import { Mode } from '../../constants/mode.enum';
import { Symbols } from '../../constants/symbols';
import { ModuleMode } from '../../interfaces/module-mode.interface';
import { ClassType } from '../../types/class.type';
import { ContainerConfiguarableComposer } from '../abstract/container-configurable-composer';

export class ModeComposer extends ContainerConfiguarableComposer {
  public async compose(): Promise<void> {
    let mode: ClassType<ModuleMode>;

    switch (this.config.mode) {
      case Mode.CLIENT:
        mode = (await import('../../modes/client.mode')).ClientMode;
        break;
      case Mode.BROKER:
        mode = (await import('../../modes/broker.mode')).BrokerMode;
        break;
      default:
        throw new Error(
          'ModuleMode implementation for selected mode does not exists',
        );
    }

    this.container.bind(Symbols.ModuleMode).to(mode).inSingletonScope();
  }
}
