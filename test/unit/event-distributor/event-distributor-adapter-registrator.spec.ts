import { BrokerProcessAdapter } from '../../../lib/core/adapters/broker/broker-process.adapter';
import { BrokerRendererAdapter } from '../../../lib/core/adapters/broker/broker-renderer.adapter';
import { BROKER_EVENT } from '../../../lib/core/constants/channels';
import { EventDistributor } from '../../../lib/core/event-distributor/event-distributor';
import { EventDistributorAdapterRegistrator } from '../../../lib/core/event-distributor/event-distributor-adapter-registrator';
import { IpcTransport } from '../../../lib/core/interfaces/ipc-transport.interface';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';

describe('EventDistributorAdapterRegistrator', () => {
  let brokerProcessAdapter: IpcTransport;
  let brokerRendererAdapter: IpcTransport;

  let eventDistributor: EventDistributor;
  let adapterRegistrator: EventDistributorAdapterRegistrator;

  beforeEach(() => {
    brokerProcessAdapter = Object.create(BrokerProcessAdapter.prototype);
    Object.assign(brokerProcessAdapter, getMockIpcTransport());

    brokerRendererAdapter = Object.create(BrokerRendererAdapter.prototype);
    Object.assign(brokerRendererAdapter, getMockIpcTransport());

    const adapters = [brokerRendererAdapter, brokerProcessAdapter];

    eventDistributor = new EventDistributor(adapters);
    adapterRegistrator = new EventDistributorAdapterRegistrator(
      adapters,
      eventDistributor,
    );
  });

  describe('register', () => {
    describe('Should register BROKER_EVENT handler for:', () => {
      it('An instance of BrokerProcessAdapter', () => {
        adapterRegistrator.register();

        expect(brokerProcessAdapter.register).toBeCalledWith(
          BROKER_EVENT,
          expect.any(Function),
        );
      });

      it('An instance of BrokerRendererAdapter', () => {
        adapterRegistrator.register();

        expect(brokerRendererAdapter.register).toBeCalledWith(
          BROKER_EVENT,
          expect.any(Function),
        );
      });
    });
  });

  describe('Handler registered on BROKER_EVENT should call EventDistributor broadcast method for: ', () => {
    it('An instance of BrokerProcessAdapter', () => {
      const spy = jest.spyOn(eventDistributor, 'broadcast');

      adapterRegistrator.register();

      const handler = getChannelHandler(brokerProcessAdapter);
      handler(getMockBrokerEventData());

      expect(spy).toBeCalled();
    });

    it('An instance of BrokerRendererAdapter', () => {
      const spy = jest.spyOn(eventDistributor, 'broadcast');

      adapterRegistrator.register();

      const handler = getChannelHandler(brokerRendererAdapter);
      handler(undefined, getMockBrokerEventData());

      expect(spy).toBeCalled();
    });

    function getChannelHandler(ipcTransport: IpcTransport) {
      return (<jest.Mock>ipcTransport.register).mock.calls[0][1];
    }
  });
});
