import { IpcMain, IpcRenderer } from 'electron';

export let ipcRenderer: Partial<IpcRenderer> = {
  on: jest.fn(),
  send: jest.fn(),
  removeListener: jest.fn(),
};

export let ipcMain: Partial<IpcMain> = {
  on: jest.fn(),
  removeListener: jest.fn(),
  emit: jest.fn(),
};

export function clearElectronMock(): void {
  ipcRenderer = {
    on: jest.fn(),
    send: jest.fn(),
    removeListener: jest.fn(),
  };
  ipcMain = {
    on: jest.fn(),
    removeListener: jest.fn(),
    emit: jest.fn(),
  };
}
