import { ExecutionContext, TransformableBrokerClient } from '../../../lib';
import { ListenerFactory } from '../../../lib/client/listener-adapter/factory/listener-factory';
import { ListenerAdapter } from '../../../lib/client/listener-adapter/listener-adapter.interface';
import { BrokerResponseListener } from '../../../lib/client/response-listener/broker-response-listener';
import { MiddlewareExecutor } from '../../../lib/middleware/middleware-executor';
import { MiddlewareExecutorFactory } from '../../../lib/types/middleware-executor-factory.type';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';
import { getMockListenerAdapter } from './__mocks__/get-mock-listener-adapter';

describe('TransformableDoveClient', () => {
  let transformableClient: TransformableBrokerClient;
  let brokerResponseListener: BrokerResponseListener;
  let listenerAdapter: ListenerAdapter;

  beforeEach(() => {
    listenerAdapter = getMockListenerAdapter();
    ListenerFactory.createListener = () => listenerAdapter;

    const middlewareExecutorFactory: MiddlewareExecutorFactory = (middleware) =>
      new MiddlewareExecutor((middleware) => <any>middleware, middleware);

    const ipcTransport = getMockIpcTransport();
    brokerResponseListener = new BrokerResponseListener(
      getMockBrokerEventData(),
    );

    transformableClient = new TransformableBrokerClient(
      ipcTransport,
      middlewareExecutorFactory,
      (brokerEvent) => new ExecutionContext(undefined, brokerEvent),
      () => {
        return brokerResponseListener;
      },
    );
  });

  class TestClass {}

  describe('invoke', () => {
    it('Should transform the result to provided target', async () => {
      const brokerEvent = getMockBrokerEventData();
      brokerEvent.data = {};

      brokerResponseListener.listen = () =>
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
