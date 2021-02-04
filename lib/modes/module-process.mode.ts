import { injectable } from 'inversify';
import { ProcessTransportAdapter } from '../adapters/process-transport.adapter';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { ModuleBaseMode } from './module-base.mode';

@injectable()
export class ModuleProcessMode extends ModuleBaseMode {
  constructor(controllersRegistrator: ControllersRegistrator) {
    super(controllersRegistrator);
  }

  protected createTransport(): IpcTransport {
    return new ProcessTransportAdapter();
  }
}
