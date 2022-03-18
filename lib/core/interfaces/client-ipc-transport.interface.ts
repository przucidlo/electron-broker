import { MessageHandler } from '../types/message-handler.type';
import { IpcTransport } from './ipc-transport.interface';

export interface ClientIpcTransport extends IpcTransport {
  unregister: (pattern: string, handler: MessageHandler) => void;
}
