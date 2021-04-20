import { inject, injectable } from 'inversify';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { EventDistributorAdapterRegistrator } from '../event-distributor/event-distributor-adapter-registrator';
import { ClientMode } from './client.mode';

@injectable()
export class BrokerMode extends ClientMode {
  constructor(
    @inject(EventDistributorAdapterRegistrator) private eventDistributorRegistrator: EventDistributorAdapterRegistrator,
    @inject(ControllersRegistrator) controllersRegistrator: ControllersRegistrator,
  ) {
    super(controllersRegistrator);
  }

  public start(): void {
    super.start();

    this.eventDistributorRegistrator.register();
  }
}
