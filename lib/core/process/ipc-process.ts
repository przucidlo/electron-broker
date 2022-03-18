import ChildProcess from 'child_process';
import { IpcProcessMessage } from './ipc-process-message.interface';
import { v4 as uuid } from 'uuid';
import { IpcProcessChannels } from './ipc-process-channels';
import { MessageHandler } from '../types/message-handler.type';
import { IpcProcessMessageListener } from './ipc-process-message.listener';

export default class IpcProcess {
  private process: NodeJS.Process | ChildProcess.ChildProcess;
  private channels: IpcProcessChannels;
  private messageListener: IpcProcessMessageListener;

  constructor(childProcess?: NodeJS.Process | ChildProcess.ChildProcess) {
    this.process = childProcess ? childProcess : process;

    this.channels = new IpcProcessChannels();
    this.messageListener = new IpcProcessMessageListener(
      this.process,
      this.channels,
    );

    this.messageListener.start();
  }

  public send(channelName: string, payload: unknown): void {
    this.process.send(
      <IpcProcessMessage>{
        messageId: uuid(),
        channelName: channelName,
        payload: payload,
      },
      (error) => {
        if (error) {
          console.error(error);
        }
      },
    );
  }

  public on(channel: string, listener: MessageHandler): void {
    this.channels.addChannel(channel, listener);
  }

  public removeListener(channel: string, listener: MessageHandler): void {
    this.channels.removeChannel(channel, listener);
  }
}
