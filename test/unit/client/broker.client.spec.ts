jest.useFakeTimers();
import { BrokerClient } from '../../../lib';
import { BrokerEventSubscriber } from '../../../lib/core/client/event-subscriber/broker-event-subscriber';
import { ListenerFactory } from '../../../lib/core/client/listener-adapter/factory/listener-factory';
import { IpcListener } from '../../../lib/core/client/response-listener/ipc-listener';
import { ResponseListener } from '../../../lib/core/client/response-listener/response-listener';
import { BROKER_EVENT } from '../../../lib/core/constants/channels';
import { IpcTransport } from '../../../lib/core/interfaces/ipc-transport.interface';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';
import { getMockListenerAdapter } from './__mocks__/get-mock-listener-adapter';

describe('BrokerClient', () => {
  const brokerEvent = getMockBrokerEventData();

  let responseListener: ResponseListener;
  let listenerAdapter: IpcListener;
  let brokerClient: BrokerClient;
  let ipcTransport: IpcTransport;

  beforeEach(() => {
    listenerAdapter = getMockListenerAdapter() as IpcListener;
    ListenerFactory.createListener = () => listenerAdapter;

    ipcTransport = getMockIpcTransport();
    responseListener = new ResponseListener(brokerEvent, listenerAdapter);

    brokerClient = new BrokerClient(
      ipcTransport,
      () => {
        return responseListener;
      },
      (pattern, listener) =>
        new BrokerEventSubscriber(listenerAdapter, pattern, listener),
    );
  });

  describe('subscribe', () => {
    it('Should create a listener for provided pattern', () => {
      const pattern = 'pattern';

      brokerClient.subscribe(pattern, () => ({}));

      expect(listenerAdapter.listen).toBeCalledWith(
        pattern,
        expect.any(Function),
      );
    });

    it('Should call provided listener if message comes', () => {
      const pattern = 'pattern';
      const listener = jest.fn();

      brokerClient.subscribe(pattern, listener);

      (<jest.Mock>listenerAdapter.listen).mock.calls[0][1](brokerEvent);

      expect(listener).toBeCalled();
    });
  });

  describe('send', () => {
    it('Should send a BrokerEvent to Broker process', async () => {
      const pattern = 'test';
      const data = 'test';

      brokerClient.send(pattern, data);

      await Promise.resolve();

      expect(ipcTransport.send).toBeCalledWith(
        BROKER_EVENT,
        expect.objectContaining({ data: data, pattern: pattern }),
      );
    });
  });

  describe('invoke', () => {
    it('Should call invokeForBrokerEvent and return data property of BrokerEvent', async () => {
      responseListener.listen = () =>
        new Promise((resolve) => resolve(brokerEvent));

      const result = await brokerClient.invoke('', '');

      expect(result).toBe(brokerEvent.data);
    });
  });
});
