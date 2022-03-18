import { IpcProcessChannels } from './ipc-process-channels';
import ChildProcess from 'child_process';
import { MessageHandler } from '../types/message-handler.type';
import {
  isIpcProcessMessage,
  IpcProcessMessage,
} from './ipc-process-message.interface';

export class IpcProcessMessageListener {
  constructor(
    private process: NodeJS.Process | ChildProcess.ChildProcess,
    private channels: IpcProcessChannels,
  ) {}

  public start(): void {
    this.process.on('message', (message: any) => {
      if (isIpcProcessMessage(message)) {
        this.forwardToChannel(message);
      }
    });
  }

  private async forwardToChannel(message: IpcProcessMessage): Promise<void> {
    const channelListener = this.channels.getChannelListenersByName(
      message.channelName,
    );

    if (channelListener) {
      await this.callListenerAndRespond(channelListener, message);
    }
  }

  private async callListenerAndRespond(
    channelListeners: MessageHandler[],
    message: IpcProcessMessage,
  ): Promise<void> {
    const listeners: Promise<void>[] = [];

    for (const channelListener of channelListeners) {
      const listenerExecution = async () => {
        const response = await channelListener(message.payload);

        this.respond(message.messageId, response);
      };

      listeners.push(listenerExecution());
    }

    await Promise.all(listeners);
  }

  private respond(messageId: string, response: any): void {
    // To avoid infinite loop in main process, we skip channelName property, when sending a response.
    const responseMessage: Omit<IpcProcessMessage, 'channelName'> = {
      messageId: messageId,
      payload: response,
    };

    this.process.send(responseMessage);
  }
}
