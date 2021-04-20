import { isBrokerEventData } from '../../../lib/interfaces/broker-event-data.interface';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';

describe('isBrokerEventData', () => {
  it('Should return true if provided object is type of brokerEvent', () => {
    expect(isBrokerEventData(getMockBrokerEventData())).toBe(true);
  });
});
