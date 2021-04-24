import { BrokerEventSubscriber } from '../../../../lib/client/event-subscriber/broker-event-subscriber';
import { ListenerFactory } from '../../../../lib/client/listener-adapter/factory/listener-factory';
import { ListenerAdapter } from '../../../../lib/client/listener-adapter/listener-adapter.interface';
import { getMockListenerAdapter } from '../__mocks__/get-mock-listener-adapter';

describe('BrokerEventSubscriber', () => {
  let listenerAdapter: ListenerAdapter;

  beforeEach(() => {
    listenerAdapter = getMockListenerAdapter();

    ListenerFactory.createListener = jest.fn().mockReturnValue(listenerAdapter);
  });

  describe('constructor', () => {
    it('Should create a listener', () => {
      const pattern = 'test';
      const listener = () => 'test';

      new BrokerEventSubscriber(pattern, listener);

      expect(listenerAdapter.listen).toBeCalledWith(pattern, listener);
    });
  });

  describe('unsubscribe', () => {
    it('Should remove the listener', () => {
      new BrokerEventSubscriber('test', () => ({})).unsubscribe();

      expect(listenerAdapter.removeListener).toBeCalled();
    });
  });
});
