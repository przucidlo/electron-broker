import { ChildProcess } from 'child_process';

export interface IpcBrokerOptions {
  processes: ChildProcess[];
  rendererSend: (pattern: any, data: any) => void;
}
