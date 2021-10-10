jest.useFakeTimers();
import { BrokerClient, ExecutionContext, Middleware } from '../../../lib';
import { BrokerEventSubscriber } from '../../../lib/core/client/event-subscriber/broker-event-subscriber';
import { ListenerFactory } from '../../../lib/core/client/listener-adapter/factory/listener-factory';
import { ListenerAdapter } from '../../../lib/core/client/listener-adapter/listener-adapter.interface';
import { IpcListener } from '../../../lib/core/client/response-listener/ipc-listener';
import { ResponseListener } from '../../../lib/core/client/response-listener/response-listener';
import { BROKER_EVENT } from '../../../lib/core/constants/channels';
import { IpcTransport } from '../../../lib/core/interfaces/ipc-transport.interface';
import { MiddlewareExecutor } from '../../../lib/core/middleware/middleware-executor';
import { MiddlewareExecutorFactory } from '../../../lib/core/types/middleware-executor-factory.type';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';
import { getMockListenerAdapter } from './__mocks__/get-mock-listener-adapter';

describe('BrokerClient', () => {
  const brokerEvent = getMockBrokerEventData();

  let responseListener: ResponseListener;
  let listenerAdapter: IpcListener;
  let brokerClient: BrokerClient;
  let ipcTransport: IpcTransport;
  let mockMiddleware: Middleware;

  beforeEach(() => {
    listenerAdapter = getMockListenerAdapter() as IpcListener;
    ListenerFactory.createListener = () => listenerAdapter;

    const middlewareExecutorFactory: MiddlewareExecutorFactory = (middleware) =>
      new MiddlewareExecutor((middleware) => <any>middleware, middleware);

    ipcTransport = getMockIpcTransport();
    mockMiddleware = { onRequest: jest.fn(), onResponse: jest.fn() };
    responseListener = new ResponseListener(brokerEvent, listenerAdapter);

    brokerClient = new BrokerClient(
      ipcTransport,
      middlewareExecutorFactory,
      (brokerEvent) => new ExecutionContext(undefined, brokerEvent),
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

    it('Should execute middleware, but only onRequest part', () => {
      brokerClient.setMiddleware([mockMiddleware]);

      brokerClient.send('pattern', 'data');

      expect(mockMiddleware.onRequest).toBeCalled();
    });

    it('Should execute middleware, but without onResponse part', () => {
      brokerClient.setMiddleware([mockMiddleware]);

      brokerClient.send('pattern', 'data');

      expect(mockMiddleware.onResponse).not.toBeCalled();
    });
  });

  describe('invokeForBrokerEvent', () => {
    const pattern = 'test';
    const data = 'test';

    it('Should send a BrokerEvent to Broker process', async () => {
      brokerClient.invokeForBrokerEvent(pattern, data);
      jest.clearAllTimers();

      await Promise.resolve();

      expect(ipcTransport.send).toBeCalledWith(
        BROKER_EVENT,
        expect.objectContaining({ data: data, pattern: pattern }),
      );
    });

    it('Should return a response from Broker process', async () => {
      responseListener.listen = () =>
        new Promise((resolve) => resolve(brokerEvent));

      const result = await brokerClient.invokeForBrokerEvent(pattern, data);

      expect(result).toBe(brokerEvent);
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
