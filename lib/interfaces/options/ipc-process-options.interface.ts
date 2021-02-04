export interface IpcProcessOptions {
  messageControllers: (new (...args: any[]) => {})[];
}
