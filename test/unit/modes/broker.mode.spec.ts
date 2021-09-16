import { ControllersRegistrator } from '../../../lib/controllers/controllers-registrator';
import { EventDistributor } from '../../../lib/event-distributor/event-distributor';
import { EventDistributorAdapterRegistrator } from '../../../lib/event-distributor/event-distributor-adapter-registrator';
import { BrokerMode } from '../../../lib/modes/broker.mode';
import { getMockControllersRegistrator } from './mocks/mock-controllers-registrator';

describe('BrokerMode', () => {
  let eventDistributorAdapterRegistrator: EventDistributorAdapterRegistrator;
  let controllerRegistrator: ControllersRegistrator;
  let brokerMode: BrokerMode;

  beforeEach(() => {
    controllerRegistrator = getMockControllersRegistrator();
    eventDistributorAdapterRegistrator = new EventDistributorAdapterRegistrator(
      [],
      new EventDistributor([]),
    );

    brokerMode = new BrokerMode(
      eventDistributorAdapterRegistrator,
      controllerRegistrator,
    );
  });

  describe('start', () => {
    it('Should call parent start method', () => {
      const spy = jest.spyOn(controllerRegistrator, 'register');

      brokerMode.start();

      expect(spy).toBeCalled();
    });

    it('Should call register method of EventDistributorRegistrator', () => {
      const spy = jest.spyOn(eventDistributorAdapterRegistrator, 'register');

      brokerMode.start();

      expect(spy).toBeCalled();
    });
  });
});
