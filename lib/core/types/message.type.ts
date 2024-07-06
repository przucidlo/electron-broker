export type Message<P extends string = string, D = unknown, R = unknown> = {
  pattern: P;
  data: D;
  response: R;
};

export default Message;
