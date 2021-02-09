import { ChildProcess } from 'child_process';
import { BrowserWindow } from 'electron';

export interface IpcBrokerOptions {
  processes: ChildProcess[];
  browserWindows: BrowserWindow[];
}
