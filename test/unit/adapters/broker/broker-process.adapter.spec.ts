import { BrokerProcessAdapter } from '../../../../lib/adapters/broker/broker-process.adapter';
import IpcProcess from '../../../../lib/process/ipc-process';

describe('BrokerProcessAdapter', () => {
  let brokerProcessAdapter: BrokerProcessAdapter;
  let ipcProcess: IpcProcess;

  beforeEach(() => {
    ipcProcess = new IpcProcess();
    brokerProcessAdapter = new BrokerProcessAdapter(ipcProcess);
  });

  describe('send', () => {
    it('Should use IpcProcess.send method to send message to process', () => {
      const processSpy = jest.spyOn(ipcProcess, 'send');

      const pattern = '123';
      const data = {};

      brokerProcessAdapter.send('123', {});

      expect(processSpy).toBeCalledWith(pattern, data);
    });
  });

  describe('register', () => {
    it('Should use IpcProcess.on method to register a listener, that will receive messages from process', () => {
      const processSpy = jest.spyOn(ipcProcess, 'on');

      const pattern = '123';
      const listener = () => ({});

      brokerProcessAdapter.register(pattern, listener);

      expect(processSpy).toBeCalledWith(pattern, listener);
    });
  });
});
