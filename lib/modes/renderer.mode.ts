import { injectable } from 'inversify';
import { RendererTransportAdapter } from '../adapters/renderer-transport.adapter';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { BaseMode } from './base.mode';

@injectable()
export class RendererMode extends BaseMode {
  constructor(controllersRegistrator: ControllersRegistrator) {
    super(controllersRegistrator);
  }

  protected createTransport(): IpcTransport {
    return new RendererTransportAdapter();
  }
}
