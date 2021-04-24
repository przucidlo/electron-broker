import { Container } from 'inversify';
import { Dove, DoveClient, DoveMode } from '../../lib';
import { Symbols } from '../../lib/constants/symbols';
import { ModuleMode } from '../../lib/interfaces/module-mode.interface';
import { ModuleConfig } from '../../lib/types/ipc-module-config.type';
import { MockMiddleware } from './__mocks__/mock-middleware';
import { MockTestController } from './__mocks__/mock-test-controller';

describe('Dove', () => {
  let container: Container;
  let dove: Dove;

  beforeEach(() => {
    container = new Container({ autoBindInjectable: true });
    dove = new Dove({ container: container, mode: DoveMode.PROCESS, options: {} });
  });

  describe('constructor', () => {
    it('If user doesnt provide a container object, should fallback to use internal container', () => {
      dove = new Dove({ mode: DoveMode.PROCESS, options: {} });

      expect(() => dove.start()).not.toThrowError();
    });
  });

  describe('start', () => {
    it('Should call start method of ModuleMode class', () => {
      const moduleMode: ModuleMode = container.get(Symbols.ModuleMode);
      const modeSpy = jest.spyOn(moduleMode, 'start');

      dove.start();

      expect(modeSpy).toBeCalledWith();
    });
  });

  describe('setMiddleware', () => {
    it('Should rebind global middleware in container context', () => {
      const expectedMiddleware = [MockMiddleware];

      dove.setMiddleware(expectedMiddleware);

      expect(container.get(Symbols.GlobalMiddleware)).toBe(expectedMiddleware);
    });
  });

  describe('setControllers', () => {
    it('Should set controllers', () => {
      const expectedControllers = [MockTestController];

      dove.setControllers(expectedControllers);

      expect(container.get<ModuleConfig>(Symbols.IpcModuleConfig).controllers).toStrictEqual(expectedControllers);
    });
  });

  describe('getDoveClient', () => {
    it('Should return instance of DoveClient', () => {
      expect(dove.getDoveClient() instanceof DoveClient).toBe(true);
    });
  });

  afterEach(() => {
    process.removeAllListeners('message');
  });
});
