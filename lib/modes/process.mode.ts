import { injectable } from 'inversify';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { BaseMode } from './base.mode';

@injectable()
export class ProcessMode extends BaseMode {
  constructor(controllersRegistrator: ControllersRegistrator) {
    super(controllersRegistrator);
  }
}
