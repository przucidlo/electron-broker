import { injectable } from 'inversify';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { BaseMode } from './base.mode';

@injectable()
export class RendererMode extends BaseMode {
  constructor(controllersRegistrator: ControllersRegistrator) {
    super(controllersRegistrator);
  }
}
