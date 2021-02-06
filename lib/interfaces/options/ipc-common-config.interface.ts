import { Container } from 'inversify';
import { Controller } from '../../types/controller.type';

export interface IpcCommonConfig {
  parentContainer?: Container;
  controllers: Controller[];
}
