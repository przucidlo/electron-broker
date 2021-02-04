import { inject, injectable } from 'inversify';
import { Symbols } from '../constants/symbols';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';

@injectable()
export class ControllersRegistrator {
  constructor(
    @inject(Symbols.IpcTransport) private ipcTransport: IpcTransport,
    @inject(Symbols.ControllerMetadata) private controllersMetadata: ControllerMetadata[],
  ) {}

  public register(): void {
    for (let controllerMetadata of this.controllersMetadata) {
      this.registerMessageHandlers(controllerMetadata);
    }
  }

  private registerMessageHandlers(controllerMetadata: ControllerMetadata) {
    const messageHandlers = controllerMetadata.messageHandlers;

    for (let pattern of Object.keys(messageHandlers)) {
      this.ipcTransport.register(pattern, messageHandlers[pattern]);
    }
  }
}
