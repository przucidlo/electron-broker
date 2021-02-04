export interface IpcRendererOptions {
  messageControllers: (new (...args: any[]) => {})[];
}
