import { Container } from 'inversify';
import Mode from '../../constants/mode.enum';
import { Controller } from '../../types/controller.type';

export interface CommonConfig {
  container?: Container;
  controllers?: Controller[];
  mode: keyof typeof Mode;
}
