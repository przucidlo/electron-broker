import { inject, injectable } from 'inversify';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { EventDistributorAdapterRegistrator } from '../event-distributor/event-distributor-adapter-registator';
import { ModuleMode } from '../interfaces/module-mode.interface';
import { ModuleBaseMode } from './module-base.mode';

@injectable()
export class ModuleBrokerMode extends ModuleBaseMode {
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
