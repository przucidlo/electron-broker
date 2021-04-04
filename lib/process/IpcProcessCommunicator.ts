import ChildProcess from 'child_process';
import { IpcProcessPayload } from './IpcProcessPayload';
import { v4 as uuid } from 'uuid';
export type Listener = (...args: any[]) => unknown;

/**
 * Describes how channels are stored inside of IpcProcessReceiver.
 */
interface ChannelCollection {
  [channelName: string]: Listener;
}

/**
 * Reusuable module that allows bidirectional communication
 * between fork process and It's father by usage of process ipc.
 */
export default class IpcProcessCommunicator {
  protected readonly process: NodeJS.Process | ChildProcess.ChildProcess;
  private channels: ChannelCollection = {};

  constructor(childProcess?: NodeJS.Process | ChildProcess.ChildProcess) {
    this.process = childProcess ? childProcess : process;

    this.listenAndForward();
  }

  public listenAndForward(): void {
    this.process.on('message', (message: IpcProcessPayload) => {
      if (message.channelName && message.messageId) {
        this.forwardToChannel(message);
      }
    });
  }

  public send(channelName: string, payload: unknown): void {
    this.process.send(<IpcProcessPayload>{ messageId: uuid(), channelName: channelName, payload: payload }, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  public on(channel: string, listener: Listener): void {
    if (this.isChannelFree(channel)) {
      this.addChannel(channel, listener);
    }
  }

  private isChannelFree(channel: string): boolean {
    const channelListener: Listener | null = this.findChannelListener(channel);

    if (!channelListener) {
      return true;
    }
    throw new Error('Handler for channel ' + channel + ' already exists.');
  }

  private addChannel(channel: string, listener: Listener): void {
    this.channels = { ...this.channels, [channel]: listener };
  }

  private async forwardToChannel(message: IpcProcessPayload): Promise<void> {
    const channelListener = this.findChannelListener(message.channelName);
    let result: any;

    if (channelListener) {
      result = await Promise.resolve(channelListener(message.payload));

      // Setting the channelName to undefined to make sure
      // the message won't be forwarded to any channel.
      // Which would create an infinite loop.
      this.respond({ ...message, channelName: undefined, payload: result });
    }
  }

  private respond(payload: any): void {
    this.process.send(payload);
  }

  private findChannelListener(channelName: string): Listener | null {
    for (const key of Object.keys(this.channels)) {
      if (key === channelName) {
        return this.channels[key];
      }
    }

    return null;
  }
}
