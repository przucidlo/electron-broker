import IpcProcess from '../../../lib/core/process/ipc-process';
import { mockProcess } from './mocks/mock-process';

describe('IpcProcess', () => {
  const mockChannelName = 'mock-channel';
  const mockPayload = { test: 'test' };

  let process: NodeJS.Process;
  let ipcProcess: IpcProcess;

  beforeEach(() => {
    process = mockProcess();
    ipcProcess = new IpcProcess(process);
  });

  describe('constructor', () => {
    it('Should start listening for messages from main process', () => {
      expect(process.on).toBeCalledWith('message', expect.any(Function));
    });
  });

  describe('send', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    beforeEach(() => {
      consoleSpy.mockClear();
    });

    it('Should use process.send method, to send message to other process', () => {
      ipcProcess.send(mockChannelName, mockPayload);

      expect(process.send).toBeCalledWith(
        expect.objectContaining({
          messageId: expect.any(String),
          channelName: mockChannelName,
          payload: mockPayload,
        }),
        expect.any(Function),
      );
    });

    it('Should call console.error If any error occurs', () => {
      ipcProcess.send(mockChannelName, mockPayload);

      const errorHandler = (<jest.Mock>process.send).mock.calls[0][1];
      errorHandler(new Error('Mock Error'));

      expect(consoleSpy).toBeCalled();
    });

    afterAll(() => {
      consoleSpy.mockRestore();
    });
  });

  describe('on', () => {
    const mockListener = () => ({});

    it('Should register new channel', () => {
      expect(() => ipcProcess.on(mockChannelName, mockListener)).not.toThrow();
    });
  });
});
