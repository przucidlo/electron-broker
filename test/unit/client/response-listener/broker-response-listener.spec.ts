jest.useFakeTimers();

import { ListenerFactory } from '../../../../lib/client/listener-adapter/factory/listener-factory';
import { ListenerAdapter } from '../../../../lib/client/listener-adapter/listener-adapter.interface';
import { BrokerResponseListener } from '../../../../lib/client/response-listener/broker-response-listener';
import { RequestTimeoutError } from '../../../../lib/errors/request-timeout.error';
import { BrokerEvent } from '../../../../lib/interfaces/broker-event.interface';
import { getMockBrokerEventData } from '../../__mocks__/get-mock-broker-event-data';

describe('BrokerResponseListener', () => {
  let brokerResponseListener: BrokerResponseListener;
  let listenerAdapter: ListenerAdapter;

  beforeEach(() => {
    listenerAdapter = { listen: jest.fn(), removeListener: jest.fn() };
    ListenerFactory.createListener = jest.fn().mockImplementation((): ListenerAdapter => listenerAdapter);

    brokerResponseListener = new BrokerResponseListener(getMockBrokerEventData());
  });

  describe('listen', () => {
    it('Should return BrokerEvent if there is a response', async () => {
      const response: BrokerEvent = { ...getMockBrokerEventData(), type: 'RESPONSE' };

      const result = brokerResponseListener.listen();

      const listener = (<jest.Mock>listenerAdapter.listen).mock.calls[0][1];
      listener(response);

      expect(await result).toBe(response);
    });

    it('Should listen for response with the same eventId as request', async () => {
      expect.assertions(1);

      try {
        const response: BrokerEvent = {
          ...getMockBrokerEventData(),
          type: 'RESPONSE',
          eventId: 'whatever-else-id-123',
        };

        const result = brokerResponseListener.listen();

        const listener = (<jest.Mock>listenerAdapter.listen).mock.calls[0][1];
        listener(response);

        jest.runAllTimers();
        await result;
      } catch (err) {
        expect(err instanceof RequestTimeoutError).toBe(true);
      }
    });

    it('Should throw RequestTimeoutError if there is no response in expected time', async () => {
      expect.assertions(1);

      try {
        const result = brokerResponseListener.listen();

        jest.runAllTimers();

        await result;
      } catch (err) {
        expect(err instanceof RequestTimeoutError).toBe(true);
      }
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
