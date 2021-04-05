import ChildProcess from 'child_process';
import { IpcProcessMessage, isIpcProcessMessage } from './ipc-process-message.interface';
import { v4 as uuid } from 'uuid';
import { IpcProcessChannels } from './ipc-process-channels';
import { MessageHandler } from '../types/message-handler.type';

export default class IpcProcess {
  private readonly process: NodeJS.Process | ChildProcess.ChildProcess;
  private readonly channels: IpcProcessChannels;

  constructor(childProcess?: NodeJS.Process | ChildProcess.ChildProcess) {
    this.process = childProcess ? childProcess : process;

    this.listenAndForward();
  }

  private listenAndForward(): void {
    this.process.on('message', (message: any) => {
      if (isIpcProcessMessage(message)) {
        this.forwardToChannel(message);
      }
    });
  }

  private async forwardToChannel(message: IpcProcessMessage): Promise<void> {
    const channelListener = this.channels.getChannelListenerByName(message.channelName);

    if (channelListener) {
      await this.callListenerAndRespond(channelListener, message);
    }
  }

  private async callListenerAndRespond(channelListener: MessageHandler, message: IpcProcessMessage): Promise<void> {
    const response = await Promise.resolve(channelListener(message.payload));

    this.respond(message.messageId, response);
  }

  private respond(messageId: string, response: any): void {
    // To avoid infinite loop in main process, we skip channelName property, when sending a response.
    const responseMessage: Omit<IpcProcessMessage, 'channelName'> = {
      messageId: messageId,
      payload: response,
    };

    this.process.send(responseMessage);
  }

  public send(channelName: string, payload: unknown): void {
    this.process.send(<IpcProcessMessage>{ messageId: uuid(), channelName: channelName, payload: payload }, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  public on(channel: string, listener: MessageHandler): void {
    if (this.channels.isChannelFree(channel)) {
      this.channels.addChannel(channel, listener);
    } else {
      throw new Error(`Listener for channel "${channel}" already exists.`);
    }
  }
}
