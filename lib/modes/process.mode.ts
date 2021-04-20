import { injectable } from 'inversify';
import { ControllersRegistrator } from '../controllers/controllers-registrator';
import { ClientMode } from './client.mode';

@injectable()
export class ProcessMode extends ClientMode {
  constructor(controllersRegistrator: ControllersRegistrator) {
    super(controllersRegistrator);
  }
}
