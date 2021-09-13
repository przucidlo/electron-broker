import { BrokerTarget } from '../constants/broker-target.enum';
import { BrokerOptions } from '../interfaces/options/broker-options.interface';
import { CommonConfig } from '../interfaces/options/common-config.interface';
import { ProcessOptions } from '../interfaces/options/process-options.interface';
import { RendererOptions } from '../interfaces/options/renderer-options.interface';

export type ModuleConfig = CommonConfig &
  (
    | {
        mode: BrokerTarget.PROCESS;
        options: ProcessOptions;
      }
    | {
        mode: BrokerTarget.BROKER;
        options: BrokerOptions;
      }
    | {
        mode: BrokerTarget.RENDERER;
        options: RendererOptions;
      }
  );
