import { BrowserWindow } from 'electron';
import { CommonConfig } from './common-config.interface';
import { ChildProcess } from 'child_process';

export interface BrokerConfig extends Omit<CommonConfig, 'mode'> {
  processes: ChildProcess[];
  browserWindows: BrowserWindow[];
}
