import { ProcessListener } from '../../../../lib/client/listener-adapter/adapters/process-listener';
import { IpcProcessMessage } from '../../../../lib/process/ipc-process-message.interface';

describe('ProcessListener', () => {
  const processSpy = jest.spyOn(process, 'on');
  let processListener: ProcessListener;

  beforeEach(() => {
    processListener = new ProcessListener();
    processSpy.mockClear();
  });

  describe('listen', () => {
    it('Should register a listener using process.on method', () => {
      processListener.listen('test', () => ({}));

      expect(processSpy).toBeCalledWith('message', expect.any(Function));
    });

    it('Should accept only message that channelName matches the provided pattern', () => {
      const listener = jest.fn();

      processListener.listen('test', listener);

      const internalListener = processSpy.mock.calls[0][1];
      internalListener(<IpcProcessMessage>{ channelName: 'test', payload: '123' });

      expect(listener).toBeCalledWith('123');
    });
  });

  describe('removeListener', () => {
    it('Should remove the listener', () => {
      processListener.listen('test', () => ({}));

      processListener.removeListener();

      expect(process.listenerCount('message')).toBe(0);
    });
  });

  afterEach(() => {
    process.removeAllListeners();
  });
});
