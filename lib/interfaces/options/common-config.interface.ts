import { Container } from 'inversify';
import { Controller } from '../../types/controller.type';

export interface CommonConfig {
  parentContainer?: Container;
  controllers: Controller[];
}
