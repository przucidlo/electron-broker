import { inject, injectable } from 'inversify';
import { EventDistributorAdapterRegistrator } from '../event-distributor/event-distributor-adapter-registator';
import { ModuleMode } from '../interfaces/module-mode.interface';

@injectable()
export class ModuleBrokerMode implements ModuleMode {
  constructor(
    @inject(EventDistributorAdapterRegistrator) private eventDistributorRegistrator: EventDistributorAdapterRegistrator,
  ) {}

  public start(): void {
    this.eventDistributorRegistrator.register();
  }
}
