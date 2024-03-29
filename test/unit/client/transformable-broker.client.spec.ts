import { ExecutionContext, TransformableBrokerClient } from '../../../lib';
import { BrokerEventSubscriber } from '../../../lib/core/client/event-subscriber/broker-event-subscriber';
import { ListenerFactory } from '../../../lib/core/client/listener-adapter/factory/listener-factory';
import { IpcListener } from '../../../lib/core/client/response-listener/ipc-listener';
import { ResponseListener } from '../../../lib/core/client/response-listener/response-listener';
import { MiddlewareExecutor } from '../../../lib/core/middleware/middleware-executor';
import { MiddlewareExecutorFactory } from '../../../lib/core/types/middleware-executor-factory.type';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';
import { getMockListenerAdapter } from './__mocks__/get-mock-listener-adapter';

describe('TransformableDoveClient', () => {
  let transformableClient: TransformableBrokerClient;
  let responseListener: ResponseListener;
  let listenerAdapter: IpcListener;

  beforeEach(async () => {
    listenerAdapter = getMockListenerAdapter();
    ListenerFactory.createListener = () => listenerAdapter;

    const middlewareExecutorFactory: MiddlewareExecutorFactory = (middleware) =>
      new MiddlewareExecutor((middleware) => <any>middleware, middleware);

    const ipcTransport = getMockIpcTransport();
    responseListener = new ResponseListener(
      getMockBrokerEventData(),
      listenerAdapter,
    );

    transformableClient = new TransformableBrokerClient(
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

  class TestClass {}

  describe('invoke', () => {
    it('Should transform the result to provided target', async () => {
      const brokerEvent = getMockBrokerEventData();
      brokerEvent.data = {};

      responseListener.listen = () =>
        new Promise((resolve) => resolve(brokerEvent));

      const result = await transformableClient.invoke('', {}, TestClass);

      expect(result instanceof TestClass).toBe(true);
    });
  });

  describe('subscribe', () => {
    it('Should transform the data property to provided target', () => {
      expect.assertions(1);

      const brokerEvent = getMockBrokerEventData();
      brokerEvent.data = {};

      const listener = (data: any) => {
        expect(data instanceof TestClass).toBe(true);
      };

      transformableClient.subscribe('', listener, TestClass);

      (<jest.Mock>listenerAdapter.listen).mock.calls[0][1](brokerEvent);
    });
  });
});
