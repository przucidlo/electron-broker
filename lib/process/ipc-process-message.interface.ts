export interface IpcProcessMessage {
  channelName: string;
  messageId: string;
  payload: unknown;
}
