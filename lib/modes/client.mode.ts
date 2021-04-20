import { injectable } from 'inversify';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { ModuleMode } from '../interfaces/module-mode.interface';

@injectable()
export class ClientMode implements ModuleMode {
  constructor(private controllersRegistrator: ControllersRegistrator) {}

  public start(): void {
    this.registerControllers();
  }

  private registerControllers(): void {
    this.controllersRegistrator.register();
  }
}
