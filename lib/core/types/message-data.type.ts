import Message from './message.type';

export type MessageData<M extends Message> = M['data'];

export default MessageData;
