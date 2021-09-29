import { BrokerEventFactory } from '../../../lib/core/helpers/broker-event.factory';
import { BrokerEvent } from '../../../lib/core/interfaces/broker-event.interface';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';

describe('BrokerEventFactory', () => {
  describe('createBrokerEvent', () => {
    it('Should create new BrokerEvent object', () => {
      const expectedBrokerEvent: BrokerEvent = {
        type: 'REQUEST',
        eventId: expect.any(String),
        pattern: 'test',
        data: {},
      };

      expect(BrokerEventFactory.createBrokerEvent('test', {})).toStrictEqual(
        expectedBrokerEvent,
      );
    });
  });

  describe('createBrokerEventAsResponse', () => {
    it('Should merge base BrokerEvent with new data, and change its type to response', () => {
      const brokerEvent = getMockBrokerEventData();

      const expectedBrokerEvent: BrokerEvent = {
        ...brokerEvent,
        type: 'RESPONSE',
        data: '123',
      };

      expect(
        BrokerEventFactory.createBrokerEventAsResponse(brokerEvent, '123'),
      ).toStrictEqual(expectedBrokerEvent);
    });
  });
});
