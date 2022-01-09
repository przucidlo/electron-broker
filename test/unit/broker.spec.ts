import { Container } from 'inversify';
import { Broker, BrokerClient, TransformableBrokerClient } from '../../lib';
import { Symbols } from '../../lib/core/constants/symbols';
import { ModuleMode } from '../../lib/core/interfaces/module-mode.interface';
import { ModuleConfig } from '../../lib/core/types/module-config.type';
import { getMockContainerWithDependencies } from './container/mock/get-mock-container-with-dependencies';
import { MockMiddleware } from './__mocks__/mock-middleware';
import { MockTestController } from './__mocks__/mock-test-controller';

describe('Broker', () => {
  let container: Container;
  let broker: Broker;

  beforeEach(async () => {
    container = await getMockContainerWithDependencies();
    broker = new Broker({
      container: container,
      options: { secure: false },
    });
  });

  describe('constructor', () => {
    it('If user doesnt provide a container object, should fallback to use internal container', () => {
      broker = new Broker({
        container: container,
        options: { secure: false },
      });

      expect(() => broker.start()).not.toThrowError();
    });
  });

  describe('start', () => {
    it('Should call start method of ModuleMode class', () => {
      const moduleMode: ModuleMode = container.get(Symbols.ModuleMode);
      const modeSpy = jest.spyOn(moduleMode, 'start');

      broker.start();

      expect(modeSpy).toBeCalledWith();
    });

    it('Should bind controllers as singletons', () => {
      broker.setControllers([MockTestController]);

      broker.start();

      expect(container.get(MockTestController)).toEqual(
        container.get(MockTestController),
      );
    });
  });

  describe('setMiddleware', () => {
    it('Should rebind global middleware in container context', () => {
      const expectedMiddleware = [MockMiddleware];

      broker.setMiddleware(expectedMiddleware);

      expect(container.get(Symbols.GlobalMiddleware)).toBe(expectedMiddleware);
    });
  });

  describe('setControllers', () => {
    it('Should set controllers', () => {
      const expectedControllers = [MockTestController];

      broker.setControllers(expectedControllers);

      expect(
        container.get<ModuleConfig>(Symbols.IpcModuleConfig).controllers,
      ).toStrictEqual(expectedControllers);
    });
  });

  describe('getClient', () => {
    it('Should return instance of BrokerClient', () => {
      expect(broker.getClient() instanceof BrokerClient).toBe(true);
    });
  });

  describe('getTransformableClient', () => {
    it('Should return instance of TransformableBrokerClient', () => {
      expect(
        broker.getTransformableClient() instanceof TransformableBrokerClient,
      ).toBe(true);
    });
  });

  afterEach(() => {
    process.removeAllListeners('message');
  });
});
