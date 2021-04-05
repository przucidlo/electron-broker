import ChildProcess from 'child_process';
import { IpcProcessMessage } from './ipc-process-message.interface';
import { v4 as uuid } from 'uuid';
import { IpcProcessChannels } from './ipc-process-channels';
import { MessageHandler } from '../types/message-handler.type';
export default class IpcProcessCommunicator {
  private readonly process: NodeJS.Process | ChildProcess.ChildProcess;
  private readonly channels: IpcProcessChannels;

  constructor(childProcess?: NodeJS.Process | ChildProcess.ChildProcess) {
    this.process = childProcess ? childProcess : process;

    this.listenAndForward();
  }

  public listenAndForward(): void {
    this.process.on('message', (message: IpcProcessMessage) => {
      if (message.channelName && message.messageId) {
        this.forwardToChannel(message);
      }
    });
  }

  private async forwardToChannel(message: IpcProcessMessage): Promise<void> {
    const channelListener = this.channels.getChannelListenerByName(message.channelName);

    if (channelListener) {
      const result = await Promise.resolve(channelListener(message.payload));

      // Setting the channelName to undefined to make sure
      // the message won't be forwarded to any channel.
      // Which would create an infinite loop.
      this.respond({ ...message, channelName: undefined, payload: result });
    }
  }

  private respond(payload: any): void {
    this.process.send(payload);
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
