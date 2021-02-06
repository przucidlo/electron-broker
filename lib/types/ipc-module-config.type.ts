import { DoveMode } from '../constants/dove-mode.enum';
import { IpcBrokerOptions } from '../interfaces/options/ipc-broker-options.interface';
import { IpcCommonConfig } from '../interfaces/options/ipc-common-config.interface';
import { IpcProcessOptions } from '../interfaces/options/ipc-process-options.interface';
import { IpcRendererOptions } from '../interfaces/options/ipc-renderer-options.interface';

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
