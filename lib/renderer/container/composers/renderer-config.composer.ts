import { Mode } from '../../..';
import { Symbols } from '../../../core/constants/symbols';
import { ContainerConfiguarableComposer } from '../../../core/container/abstract/container-configurable-composer';
import { CommonConfig } from '../../../core/interfaces/options/common-config.interface';

export default class RendererConfigComposer extends ContainerConfiguarableComposer<CommonConfig> {
  public compose(): void {
    this.config.mode = Mode.CLIENT;

    this.container.rebind(Symbols.IpcModuleConfig).toConstantValue(this.config);
  }
}
