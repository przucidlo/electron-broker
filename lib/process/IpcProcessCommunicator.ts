import ChildProcess from 'child_process';
import { IpcMessageSerialization } from './IpcMessageSerialization';
import { IpcProcessPayload } from './IpcProcessPayload';
import IpcProcessTransportLayer from './IpcProcessTransportLayer';

type Listener = (...args: any[]) => void;

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
export default class IpcProcessCommunicator extends IpcProcessTransportLayer {
  private channels: ChannelCollection = {};

  constructor(childProcess?: NodeJS.Process | ChildProcess.ChildProcess) {
    super(childProcess);

    this.listenAndForward();
  }

  public on(channel: string, listener: Listener): void {
    if (this.isChannelFree(channel)) {
      this.addChannel(channel, listener);
    }
  }

  private addChannel(channel: string, listener: Listener): void {
    this.channels = { ...this.channels, [channel]: listener };
  }

  public listenAndForward(): void {
    this.process.on('message', (message: IpcProcessPayload) => {
      if (message.channelName && message.messageId) {
        this.forwardToChannel(message);
      }
    });
  }

  private async forwardToChannel(message: IpcProcessPayload): Promise<void> {
    const channelListener = this.findChannelListener(message.channelName);
    let result: any;

    if (channelListener) {
      const deserializedMessage = IpcMessageSerialization.deserialize(message.payload);

      result = await Promise.resolve(channelListener(deserializedMessage));

      // Setting the channelName to undefined to make sure
      // the message won't be forwarded to any channel.
      // Which would create an infinite loop.
      this.respond({ ...message, channelName: undefined, payload: result });
    }
  }

  /**
   * Sends a response to parent process.
   *
   * @arg payload data that will be converted to JSON and stringified after.
   */
  private respond(payload: any): void {
    if (this.process.send) {
      this.process.send(payload);
    } else {
      console.log('Send object doesnt exists in given process');
    }
  }

  private isChannelFree(channel: string): boolean {
    let channelListener: Listener | null = this.findChannelListener(channel);

    if (!channelListener) {
      return true;
    }
    throw new Error('Handler for channel ' + channel + ' already exists.');
  }

  private findChannelListener(channelName: string): Listener | null {
    for (let key of Object.keys(this.channels)) {
      if (key === channelName) {
        return this.channels[key];
      }
    }

    return null;
  }
}
