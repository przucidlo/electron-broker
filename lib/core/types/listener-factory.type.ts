import { IpcListener } from '../client/response-listener/ipc-listener';

export type ListenerFactory = () => IpcListener;
