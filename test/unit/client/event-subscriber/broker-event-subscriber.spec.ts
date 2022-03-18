import { BrokerEventSubscriber } from '../../../../lib/core/client/event-subscriber/broker-event-subscriber';
import { ListenerFactory } from '../../../../lib/core/client/listener-adapter/factory/listener-factory';
import { IpcListener } from '../../../../lib/core/client/response-listener/ipc-listener';
import { getMockListenerAdapter } from '../__mocks__/get-mock-listener-adapter';

describe('BrokerEventSubscriber', () => {
  let ipcListener: IpcListener;

  beforeEach(() => {
    ipcListener = getMockListenerAdapter();

    ListenerFactory.createListener = jest.fn().mockReturnValue(ipcListener);
  });

  describe('constructor', () => {
    it('Should create a listener', () => {
      const pattern = 'test';
      const listener = () => 'test';

      new BrokerEventSubscriber(ipcListener, pattern, listener);

      expect(ipcListener.listen).toBeCalledWith(pattern, listener);
    });
  });

  describe('unsubscribe', () => {
    it('Should remove the listener', () => {
      new BrokerEventSubscriber(ipcListener, 'test', () => ({})).unsubscribe();

      expect(ipcListener.removeListener).toBeCalled();
    });
  });
});
