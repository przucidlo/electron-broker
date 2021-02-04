import { Container } from 'inversify';
import { Controller } from '../controller.type';

export interface IpcCommonConfig {
  parentContainer?: Container;
  controllers: Controller[];
}
