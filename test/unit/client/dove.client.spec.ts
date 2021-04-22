jest.useFakeTimers();
import { DoveClient, ExecutionContext, Middleware } from '../../../lib';
import { ListenerFactory } from '../../../lib/client/listener-adapter/factory/listener-factory';
import { ListenerAdapter } from '../../../lib/client/listener-adapter/listener-adapter.interface';
import { BrokerResponseListener } from '../../../lib/client/response-listener/broker-response-listener';
import { BROKER_EVENT } from '../../../lib/constants/channels';
import { IpcTransport } from '../../../lib/interfaces/ipc-transport.interface';
import { MiddlewareExecutor } from '../../../lib/middleware/middleware-executor';
import { MiddlewareExecutorFactory } from '../../../lib/types/middleware-executor-factory.type';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';
import { getMockListenerAdapter } from './__mocks__/get-mock-listener-adapter';

describe('DoveClient', () => {
  const brokerEvent = getMockBrokerEventData();

  let brokerResponseListener: BrokerResponseListener;
  let listenerAdapter: ListenerAdapter;
  let doveClient: DoveClient;
  let ipcTransport: IpcTransport;
  let mockMiddleware: Middleware;

  beforeEach(() => {
    listenerAdapter = getMockListenerAdapter();
    ListenerFactory.createListener = () => listenerAdapter;

    const middlewareExecutorFactory: MiddlewareExecutorFactory = (middleware) =>
      new MiddlewareExecutor((middleware) => <any>middleware, middleware);

    ipcTransport = getMockIpcTransport();
    mockMiddleware = { onRequest: jest.fn(), onResponse: jest.fn() };
    brokerResponseListener = new BrokerResponseListener(brokerEvent);

    doveClient = new DoveClient(
      ipcTransport,
      middlewareExecutorFactory,
      (brokerEvent) => new ExecutionContext(undefined, brokerEvent),
      () => {
        return brokerResponseListener;
      },
    );
  });

  describe('subscribe', () => {
    it('Should create a listener for provided pattern', () => {
      const pattern = 'pattern';

      doveClient.subscribe(pattern, () => ({}));

      expect(listenerAdapter.listen).toBeCalledWith(pattern, expect.any(Function));
    });

    it('Should call provided listener if message comes', () => {
      const pattern = 'pattern';
      const listener = jest.fn();

      doveClient.subscribe(pattern, listener);

      (<jest.Mock>listenerAdapter.listen).mock.calls[0][1](brokerEvent);

      expect(listener).toBeCalled();
    });
  });

  describe('send', () => {
    it('Should send a BrokerEvent to Broker process', async () => {
      const pattern = 'test';
      const data = 'test';

      doveClient.send(pattern, data);

      await Promise.resolve();

      expect(ipcTransport.send).toBeCalledWith(BROKER_EVENT, expect.objectContaining({ data: data, pattern: pattern }));
    });

    it('Should execute middleware, but only onRequest part', () => {
      doveClient.setMiddleware([mockMiddleware]);

      doveClient.send('pattern', 'data');

      expect(mockMiddleware.onRequest).toBeCalled();
    });

    it('Should execute middleware, but without onResponse part', () => {
      doveClient.setMiddleware([mockMiddleware]);

      doveClient.send('pattern', 'data');

      expect(mockMiddleware.onResponse).not.toBeCalled();
    });
  });

  describe('invokeForBrokerEvent', () => {
    const pattern = 'test';
    const data = 'test';

    it('Should send a BrokerEvent to Broker process', async () => {
      doveClient.invokeForBrokerEvent(pattern, data);
      jest.clearAllTimers();

      await Promise.resolve();

      expect(ipcTransport.send).toBeCalledWith(BROKER_EVENT, expect.objectContaining({ data: data, pattern: pattern }));
    });

    it('Should return a response from Broker process', async () => {
      brokerResponseListener.listen = () => new Promise((resolve) => resolve(brokerEvent));

      const result = await doveClient.invokeForBrokerEvent(pattern, data);

      expect(result).toBe(brokerEvent);
    });
  });

  describe('invoke', () => {
    it('Should call invokeForBrokerEvent and return data property of BrokerEvent', async () => {
      brokerResponseListener.listen = () => new Promise((resolve) => resolve(brokerEvent));

      const result = await doveClient.invoke('', '');

      expect(result).toBe(brokerEvent.data);
    });
  });
});
