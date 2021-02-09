import { Container } from 'inversify';
import { Controller } from '../../types/controller.type';

export interface CommonConfig {
  container?: Container;
  controllers: Controller[];
}
