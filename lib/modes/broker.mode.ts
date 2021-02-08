import { inject, injectable } from 'inversify';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { EventDistributorAdapterRegistrator } from '../event-distributor/event-distributor-adapter-registator';
import { BaseMode } from './base.mode';

@injectable()
export class BrokerMode extends BaseMode {
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
