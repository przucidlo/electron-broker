import { CommonConfig } from './common-config.interface';

export interface ClientConfig extends CommonConfig {
  mode: 'CLIENT';
}
