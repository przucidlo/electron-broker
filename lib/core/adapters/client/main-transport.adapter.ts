import { ipcMain } from 'electron';
import { inject, injectable } from 'inversify';
import { EventDistributor } from '../../event-distributor/event-distributor';
import { BrokerEvent } from '../../interfaces/broker-event.interface';
import { ClientIpcTransport } from '../../interfaces/client-ipc-transport.interface';
import { MessageHandler } from '../../types/message-handler.type';

@injectable()
export class MainTransportAdapter implements ClientIpcTransport {
  constructor(
    @inject(EventDistributor) private eventDistributor: EventDistributor,
  ) {}

  public send(pattern: string, data: BrokerEvent): void {
    this.eventDistributor.broadcast(data);
  }

  public register(pattern: string, handler: MessageHandler): void {
    ipcMain.on(pattern, (event, data) => {
      handler(data);
    });
  }

  public unregister(pattern: string, handler: MessageHandler): void {
    ipcMain.removeListener(pattern, handler);
  }
}
