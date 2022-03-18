import { ipcMain } from 'electron';
import Broker from '../broker';
import { ModuleConfig } from '../core/types/module-config.type';

export default class BrokerMain extends Broker {
  constructor(config: ModuleConfig) {
    super(config);

    this.setMaxListeners();
  }

  private setMaxListeners() {
    ipcMain.setMaxListeners(0);
  }
}
