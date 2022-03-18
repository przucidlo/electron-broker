import { Broker } from '..';
import { ClientConfig } from '../core/interfaces/options/client-config.interface';

export default class BrokerRenderer extends Broker {
  constructor(config: ClientConfig) {
    super(config);
  }
}
