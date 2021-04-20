import { ControllersRegistrator } from '../../../lib/controllers/controllers-registrator';
import { ClientMode } from '../../../lib/modes/client.mode';
import { getMockControllersRegistrator } from './mocks/mock-controllers-registrator';

describe('ClientMode', () => {
  let controllerRegistrator: ControllersRegistrator;
  let clientMode: ClientMode;

  beforeEach(() => {
    controllerRegistrator = getMockControllersRegistrator();

    clientMode = new ClientMode(controllerRegistrator);
  });

  describe('start', () => {
    it('Should use ControllersRegistartor object to register controllers', () => {
      const spy = jest.spyOn(controllerRegistrator, 'register');

      clientMode.start();

      expect(spy).toBeCalled();
    });
  });
});
