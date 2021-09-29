import { BrokerOptions } from './broker-options.interface';
import { CommonConfig } from './common-config.interface';

export interface BrokerConfig extends CommonConfig {
  mode: 'BROKER';
  options: BrokerOptions;
}
