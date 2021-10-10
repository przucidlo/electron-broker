import { Broker } from '..';
import { ModuleConfig } from '../core/types/module-config.type';

export default class BrokerProcess extends Broker {
  constructor(config: ModuleConfig) {
    super(config);

    this.setMaxListeners();
  }
}
