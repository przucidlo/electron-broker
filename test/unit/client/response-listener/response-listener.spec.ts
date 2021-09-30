jest.useFakeTimers();

import { ListenerFactory } from '../../../../lib/core/client/listener-adapter/factory/listener-factory';
import { ListenerAdapter } from '../../../../lib/core/client/listener-adapter/listener-adapter.interface';
import { ResponseListener } from '../../../../lib/core/client/response-listener/response-listener';
import { BROKER_EXCEPTION_MARKER } from '../../../../lib/core/constants/exceptions';
import BrokerExceptionError from '../../../../lib/core/errors/broker-exception.error';
import { RequestTimeoutError } from '../../../../lib/core/errors/request-timeout.error';
import { BrokerEvent } from '../../../../lib/core/interfaces/broker-event.interface';
import { getMockBrokerEventData } from '../../__mocks__/get-mock-broker-event-data';
import { getMockListenerAdapter } from '../__mocks__/get-mock-listener-adapter';

describe('ResponseListener', () => {
  let responseListener: ResponseListener;
  let listenerAdapter: ListenerAdapter;

  beforeEach(() => {
    listenerAdapter = getMockListenerAdapter();
    ListenerFactory.createListener = jest
      .fn()
      .mockImplementation((): ListenerAdapter => listenerAdapter);

    responseListener = new ResponseListener(
      getMockBrokerEventData(),
      listenerAdapter,
    );
  });

  describe('listen', () => {
    it('Should return BrokerEvent if there is a response', async () => {
      const response: BrokerEvent = {
        ...getMockBrokerEventData(),
        type: 'RESPONSE',
      };

      const result = responseListener.listen();

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

        const result = responseListener.listen();

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
        const result = responseListener.listen();

        jest.runAllTimers();

        await result;
      } catch (err) {
        expect(err instanceof RequestTimeoutError).toBe(true);
      }
    });

    it('Should throw BrokerExceptionError if response contains exception marker', async () => {
      expect.assertions(1);

      const response: BrokerEvent = {
        ...getMockBrokerEventData(),
        type: 'RESPONSE',
        data: {
          [BROKER_EXCEPTION_MARKER]: true,
        },
      };

      try {
        const result = responseListener.listen();

        const listener = (<jest.Mock>listenerAdapter.listen).mock.calls[0][1];
        listener(response);

        await result;
      } catch (err) {
        expect(err instanceof BrokerExceptionError).toBe(true);
      }
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
