import { BrokerResponseListener } from '../../../../lib/core/client/response-listener/broker-response-listener';
import { Symbols } from '../../../../lib/core/constants/symbols';
import { BrokerResponseListenerFactory } from '../../../../lib/core/types/broker-responser-listener-factory.type';
import { getMockBrokerEventData } from '../../__mocks__/get-mock-broker-event-data';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('BrokerResponseListenerFactoryComposer', () => {
  let brokerResponseListenerFactory: BrokerResponseListenerFactory;

  beforeEach(async () => {
    const container = await getMockContainerWithDependencies();

    brokerResponseListenerFactory = container.get(
      Symbols.BrokerResponseListenerFactory,
    );
  });

  describe('BrokerResponseListenerFactory', () => {
    it('Should return a new instance of BrokerResponseListener class', () => {
      expect(
        brokerResponseListenerFactory(getMockBrokerEventData()) instanceof
          BrokerResponseListener,
      ).toBe(true);
    });
  });
});
