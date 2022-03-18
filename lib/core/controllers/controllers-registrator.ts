import { inject, injectable } from 'inversify';
import { Symbols } from '../constants/symbols';
import { ControllerMetadata } from '../interfaces/controller-metadata.interface';
import { IpcTransport } from '../interfaces/ipc-transport.interface';
import { ControllersMetadataFactory } from '../types/controllers-metadata-factory.type';
import { MessageHandlerWithPattern } from '../interfaces/message-handler-with-pattern.interface';
import { RequestExecutorInjector } from './request-executor-injector';

@injectable()
export class ControllersRegistrator {
  constructor(
    @inject(RequestExecutorInjector)
    private requestExecutorInjector: RequestExecutorInjector,
    @inject(Symbols.IpcTransport) private ipcTransport: IpcTransport,
    @inject(Symbols.ControllersMetadataFactory)
    private controllersMetadataFactory: ControllersMetadataFactory,
  ) {}

  public register(): void {
    const controllersMetadata: ControllerMetadata[] = <ControllerMetadata[]>(
      this.controllersMetadataFactory()
    );

    const messageHandlersWithPattern = this.requestExecutorInjector.injectIntoControllersHandlers(
      controllersMetadata,
    );

    for (const messageHandlerWithPattern of messageHandlersWithPattern) {
      this.registerMessageHandlers(messageHandlerWithPattern);
    }
  }

  private registerMessageHandlers(
    messageHandlerWithPattern: MessageHandlerWithPattern,
  ) {
    const { pattern, handler } = messageHandlerWithPattern;

    this.ipcTransport.register(pattern, handler);
  }
}
