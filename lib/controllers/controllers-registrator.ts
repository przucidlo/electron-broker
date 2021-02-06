import { inject, injectable, interfaces } from 'inversify';
import { Symbols } from '../constants/symbols';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';

@injectable()
export class ControllersRegistrator {
  constructor(
    @inject(Symbols.IpcTransport) private ipcTransport: IpcTransport,
    @inject(Symbols.ControllersMetadataFactory)
    private controllersMetadataFactory: () => ControllerMetadata[],
  ) {}

  public register(): void {
    const controllersMetadata: ControllerMetadata[] = <ControllerMetadata[]>this.controllersMetadataFactory();

    for (const controllerMetadata of controllersMetadata) {
      this.registerMessageHandlers(controllerMetadata);
    }
  }

  private registerMessageHandlers(controllerMetadata: ControllerMetadata) {
    const messageHandlers = controllerMetadata.messageHandlers;

    for (const pattern of Object.keys(messageHandlers)) {
      this.ipcTransport.register(pattern, messageHandlers[pattern]);
    }
  }
}
