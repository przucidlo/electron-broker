import { Container } from 'inversify';

export interface IpcCommonConfig {
  parentContainer?: Container;
  controllers: (new (...args: any[]) => {})[];
}
