import { DoveMode } from '../constants/dove-mode.enum';
import { IpcBrokerOptions } from './options/ipc-broker-options.interface';
import { IpcCommonConfig } from './options/ipc-common-config.interface';
import { IpcProcessOptions } from './options/ipc-process-options.interface';
import { IpcRendererOptions } from './options/ipc-renderer-options.interface';

export type IpcModuleConfig = IpcCommonConfig &
  (
    | {
        mode: DoveMode.PROCESS;
        options: IpcProcessOptions;
      }
    | {
        mode: DoveMode.BROKER;
        options: IpcBrokerOptions;
      }
    | {
        mode: DoveMode.RENDERER;
        options: IpcRendererOptions;
      }
  );
