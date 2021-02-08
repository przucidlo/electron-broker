import { injectable } from 'inversify';
import { ProcessTransportAdapter } from '../adapters/process-transport.adapter';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { BaseMode } from './base.mode';

@injectable()
export class ProcessMode extends BaseMode {
  constructor(controllersRegistrator: ControllersRegistrator) {
    super(controllersRegistrator);
  }

  protected createTransport(): IpcTransport {
    return new ProcessTransportAdapter();
  }
}
