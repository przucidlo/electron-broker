import { IsoDateTransformerMiddleware } from '../../../lib';
import { IsoDateTransformer } from '../../../lib/helpers/iso-date-transformer';
import { BrokerEvent } from '../../../lib/interfaces/broker-event.interface';
import { getMockExecutionContext } from '../controllers/__mocks__/get-mock-execution-context';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import {
  getMockTestControllerMetadata,
  MOCK_TEST_CONTROLLER_PATTERN,
} from '../__mocks__/mock-test-controller';

describe('IsoDateTransformerMiddleware', () => {
  describe('onRequest', () => {
    it('Should call IsoDateTransformer on brokerEvent.data', () => {
      const brokerEvent = getMockBrokerEventData();
      const context = getMockExecutionContext(
        getMockTestControllerMetadata(),
        MOCK_TEST_CONTROLLER_PATTERN,
        brokerEvent,
      );

      const value = jest.fn();
      IsoDateTransformer.transform = jest.fn().mockReturnValue(value);

      new IsoDateTransformerMiddleware().onRequest(context);

      expect(context.brokerEvent.data).toBe(value);
    });
  });

  describe('onResponse', () => {
    it('Should call IsoDateTransformer on brokerEvent.data if message is a BrokerEvent', () => {
      const brokerEvent = getMockBrokerEventData();
      const value = jest.fn();
      IsoDateTransformer.transform = jest.fn().mockReturnValue(value);

      const result: BrokerEvent = <BrokerEvent>(
        new IsoDateTransformerMiddleware().onResponse(brokerEvent)
      );

      expect(result.data).toBe(value);
    });

    it('Should call IsoDateTransformer to transform received message and return it', () => {
      const value = jest.fn();
      IsoDateTransformer.transform = jest.fn().mockImplementation((fn) => fn);

      const result = new IsoDateTransformerMiddleware().onResponse(value);

      expect(result).toBe(value);
    });
  });
});
