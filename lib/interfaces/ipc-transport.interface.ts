export interface IpcTransport {
  send(pattern: string, data: any): void;
  register(pattern: string, handler: any[string]): void | Promise<void>;
}
