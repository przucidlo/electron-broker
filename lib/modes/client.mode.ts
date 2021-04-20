import { injectable } from 'inversify';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { ModuleMode } from '../interfaces/module-mode.interface';

@injectable()
export abstract class ClientMode implements ModuleMode {
  protected ipcTransport: IpcTransport;

  constructor(private controllersRegistrator: ControllersRegistrator) {}

  public start(): void {
    this.registerControllers();
  }

  private registerControllers(): void {
    this.controllersRegistrator.register();
  }
}
