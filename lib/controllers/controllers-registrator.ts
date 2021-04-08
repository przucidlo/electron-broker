import { inject, injectable } from 'inversify';
import { Symbols } from '../constants/symbols';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { ControllersRequestExecutorInjector } from './controllers-request-executor-injector';

@injectable()
export class ControllersRegistrator {
  constructor(
    @inject(ControllersRequestExecutorInjector) private middlewareInjector: ControllersRequestExecutorInjector,
    @inject(Symbols.IpcTransport) private ipcTransport: IpcTransport,
    @inject(Symbols.ControllersMetadataFactory)
    private controllersMetadataFactory: () => ControllerMetadata[],
  ) {}

  public register(): void {
    const controllersMetadata: ControllerMetadata[] = <ControllerMetadata[]>this.controllersMetadataFactory();

    this.middlewareInjector.inject(controllersMetadata);

    for (const controllerMetadata of controllersMetadata) {
      this.registerMessageHandlers(controllerMetadata);
    }
  }

  private registerMessageHandlers(controllerMetadata: ControllerMetadata) {
    const messageHandlers = controllerMetadata.messageHandlers;

    for (const pattern of Object.keys(messageHandlers)) {
      const messageHandler = messageHandlers[pattern].handler;

      this.ipcTransport.register(pattern, messageHandler);
    }
  }
}
