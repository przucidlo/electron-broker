import { Container } from 'inversify';
import { Symbols } from '../../../../lib/constants/symbols';
import { ControllersMetadataFactory } from '../../../../lib/types/controllers-metadata-factory.type';
import { getMockTestControllerMetadata, MockTestController } from '../../__mocks__/mock-test-controller';
import { getMockContainerWithDependencies } from '../mock/get-mock-container-with-dependencies';

describe('ControllersMetadataFactoryComposer', () => {
  let controllersMetadataFactory: ControllersMetadataFactory;
  let container: Container;

  beforeEach(() => {
    container = getMockContainerWithDependencies({
      mode: 'CLIENT',
      controllers: [new MockTestController()],
    });

    controllersMetadataFactory = container.get(Symbols.ControllersMetadataFactory);
  });

  describe('ControllersMetadataFactory', () => {
    it('Should return controllers metadata', () => {
      const expectedControllersMetadata = [getMockTestControllerMetadata()];

      expect(controllersMetadataFactory()).toStrictEqual(expectedControllersMetadata);
    });

    it('If controller is marked as injectable, it should be initialized using DI', () => {
      container = getMockContainerWithDependencies({
        mode: 'CLIENT',
        controllers: [MockTestController],
      });
      container.bind(MockTestController).toConstantValue(new MockTestController());
      controllersMetadataFactory = container.get(Symbols.ControllersMetadataFactory);

      const spy = jest.spyOn(container, 'get');

      controllersMetadataFactory();

      expect(spy).toBeCalled();
    });
  });
});
