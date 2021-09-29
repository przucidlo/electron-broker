import { ChildProcess } from 'child_process';
import { BrowserWindow } from 'electron';

export interface BrokerOptions {
  processes: ChildProcess[];
  browserWindows: BrowserWindow[];
}
