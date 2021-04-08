import { IpcTransport } from '../../../lib/interfaces/ipc-transport.interface';

export function getMockIpcTransport(): IpcTransport {
  return { send: jest.fn(), register: jest.fn() };
}
