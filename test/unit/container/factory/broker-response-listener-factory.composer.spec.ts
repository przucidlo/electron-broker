import { BrokerResponseListener } from '../../../../lib/client/response-listener/broker-response-listener';
import { Symbols } from '../../../../lib/constants/symbols';
import { BrokerResponseListenerFactory } from '../../../../lib/types/broker-responser-listener-factory.type';
import { getMockBrokerEventData } from '../../__mocks__/get-mock-broker-event-data';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('BrokerResponseListenerFactoryComposer', () => {
  let brokerResponseListenerFactory: BrokerResponseListenerFactory;

  beforeEach(() => {
    const container = getMockContainerWithDependencies();

    brokerResponseListenerFactory = container.get(
      Symbols.BrokerResponseListenerFactory,
    );
  });

  describe('BrokerResponseListenerFactory', () => {
    it('Should return a new instance of MiddlewareExecutor class', () => {
      expect(
        brokerResponseListenerFactory(getMockBrokerEventData()) instanceof
          BrokerResponseListener,
      ).toBe(true);
    });
  });
});
