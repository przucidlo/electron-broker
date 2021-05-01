import { isBrokerEvent } from '../../../lib/type-guards/is-broker-event.typeguard';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';

describe('isBrokerEvent', () => {
  it('Should return true if object implements BrokerEvent interface', () => {
    const brokerEvent = getMockBrokerEventData();

    expect(isBrokerEvent(brokerEvent)).toBe(true);
  });

  it('Should return false if object does not implement BrokerEvent interface', () => {
    const brokerEvent = getMockBrokerEventData();

    delete brokerEvent.eventId;

    expect(isBrokerEvent(brokerEvent)).toBe(false);
  });
});
