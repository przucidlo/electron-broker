export interface IpcProcessMessage {
  channelName: string;
  messageId: string;
  payload: unknown;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isIpcProcessMessage(
  message: any,
): message is IpcProcessMessage {
  return message.channelName && message.messageId;
}
