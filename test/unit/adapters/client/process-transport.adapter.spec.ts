import { ProcessTransportAdapter } from '../../../../lib/adapters/client/process-transport.adapter';
import IpcProcess from '../../../../lib/process/ipc-process';

describe('ProcessTransportAdapter', () => {
  let transportAdapter: ProcessTransportAdapter;
  let ipcProcess: IpcProcess;

  beforeEach(() => {
    ipcProcess = new IpcProcess();
    transportAdapter = new ProcessTransportAdapter(ipcProcess);
  });

  describe('send', () => {
    it('Should use IpcProcess.send method to send message to main process', () => {
      const processSpy = jest.spyOn(ipcProcess, 'send');

      const pattern = '123';
      const data = {};

      transportAdapter.send('123', {});

      expect(processSpy).toBeCalledWith(pattern, data);
    });
  });

  describe('register', () => {
    it('Should use IpcProcess.on method to register a listener, that will receive messages from main process', () => {
      const processSpy = jest.spyOn(ipcProcess, 'on');

      const pattern = '123';
      const listener = () => ({});

      transportAdapter.register(pattern, listener);

      expect(processSpy).toBeCalledWith(pattern, listener);
    });
  });
});
