export type Message<P extends string, D extends unknown, R extends unknown> = {
  pattern: P;
  data: D;
  response: R;
};
