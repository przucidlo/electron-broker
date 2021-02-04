import { ChildProcess } from 'child_process';
import { IpcRenderer } from 'electron';

export interface IpcBrokerOptions {
  processes: ChildProcess[];
  renderer: IpcRenderer;
  rendererSend: (pattern: any, data: any) => void;
}
