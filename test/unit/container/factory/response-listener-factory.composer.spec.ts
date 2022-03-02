import { ResponseListener } from '../../../../lib/core/client/response-listener/response-listener';
import { Symbols } from '../../../../lib/core/constants/symbols';
import { ResponseListenerFactory } from '../../../../lib/core/types/response-listener-factory.type';
import { getMockBrokerEventData } from '../../__mocks__/get-mock-broker-event-data';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('ResponseListenerFactoryComposer', () => {
  let responseListenerFactory: ResponseListenerFactory;

  beforeEach(async () => {
    const container = await getMockContainerWithDependencies();

    responseListenerFactory = container.get(Symbols.ResponseListenerFactory);
  });

  describe('ResponseListenerFactory', () => {
    it('Should return a new instance of ResponseListener class', () => {
      expect(
        responseListenerFactory(getMockBrokerEventData(), 30) instanceof
          ResponseListener,
      ).toBe(true);
    });
  });
});
