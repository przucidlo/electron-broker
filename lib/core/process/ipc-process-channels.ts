import { MessageHandler } from '../types/message-handler.type';

interface ChannelCollection {
  [channelName: string]: MessageHandler[];
}

export class IpcProcessChannels {
  private channels: ChannelCollection = {};

  public addChannel(channelName: string, listener: MessageHandler): void {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }

    this.channels[channelName].push(listener);
  }

  public removeChannel(channelName: string, listener: MessageHandler): void {
    const handlers = this.channels[channelName];

    if (handlers) {
      this.channels[channelName] = handlers.filter(
        (handler) => handler !== listener,
      );
    }
  }

  public getChannelListenersByName(channelName: string): MessageHandler[] {
    for (const key of Object.keys(this.channels)) {
      if (key === channelName) {
        return this.channels[key];
      }
    }

    return [];
  }
}
