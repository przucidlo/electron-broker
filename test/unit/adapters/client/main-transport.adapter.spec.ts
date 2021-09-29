import { MainTransportAdapter } from '../../../../lib/core/adapters/client/main-transport.adapter';
import { EventDistributor } from '../../../../lib/core/event-distributor/event-distributor';
import { clearElectronMock, ipcMain } from '../../__mocks__/electron-mock';
import { getMockBrokerEventData } from '../../__mocks__/get-mock-broker-event-data';

describe('MainTransportAdapter', () => {
  let transportAdapter: MainTransportAdapter;
  let eventDistributor: EventDistributor;

  beforeEach(() => {
    clearElectronMock();

    eventDistributor = <EventDistributor>(<unknown>{ broadcast: jest.fn() });
    transportAdapter = new MainTransportAdapter(eventDistributor);
  });

  describe('send', () => {
    it('Should use EventDistributor.broadcast to send message outside of the main process', () => {
      const brokerEvent = getMockBrokerEventData();

      transportAdapter.send('123', brokerEvent);

      expect(eventDistributor.broadcast).toBeCalledWith(brokerEvent);
    });
  });

  describe('register', () => {
    it('Should register a listener that will receive messages from outside of main process', () => {
      const pattern = '123';
      const listener = jest.fn();

      transportAdapter.register(pattern, listener);

      expect(ipcMain.on).toBeCalledWith(pattern, expect.any(Function));
    });

    it('Should execute provided listener if message arrives', () => {
      const pattern = '123';
      const listener = jest.fn();

      transportAdapter.register(pattern, listener);

      const internalListener = (<jest.Mock>ipcMain.on).mock.calls[0][1];
      internalListener();

      expect(listener).toBeCalled();
    });
  });
});
