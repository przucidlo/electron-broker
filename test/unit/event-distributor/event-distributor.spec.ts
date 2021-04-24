import { EventDistributor } from '../../../lib/event-distributor/event-distributor';
import { IpcTransport } from '../../../lib/interfaces/ipc-transport.interface';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';

describe('EventDistributor', () => {
  let ipcTransport: IpcTransport;
  let eventDistributor: EventDistributor;

  beforeEach(() => {
    ipcTransport = getMockIpcTransport();
    eventDistributor = new EventDistributor([ipcTransport]);
  });

  describe('broadcast', () => {
    it('Should call send methods on all broker adapters', () => {
      const brokerEvent = getMockBrokerEventData();

      eventDistributor.broadcast(brokerEvent);

      expect(ipcTransport.send).toBeCalledWith(brokerEvent.pattern, brokerEvent);
    });
  });
});
