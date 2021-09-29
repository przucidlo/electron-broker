import { MessageHandler } from '../types/message-handler.type';

interface ChannelCollection {
  [channelName: string]: MessageHandler;
}

export class IpcProcessChannels {
  private channels: ChannelCollection = {};

  public addChannel(channelName: string, listener: MessageHandler): void {
    this.channels = { ...this.channels, [channelName]: listener };
  }

  public isChannelFree(channelName: string): boolean {
    return !this.getChannelListenerByName(channelName);
  }

  public getChannelListenerByName(channelName: string): MessageHandler {
    for (const key of Object.keys(this.channels)) {
      if (key === channelName) {
        return this.channels[key];
      }
    }

    return null;
  }
}
