import { Data } from '../../../lib';
import MessagePattern from '../../../lib/decorators/message-pattern.decorator';
import { ControllerMetadata } from '../../../lib/interfaces/controller-metadata.interface';
import { HandlerParamMetadata } from '../../../lib/interfaces/handler-param-metadata.interface';
import { ControllerHandlersMetadataReader } from '../../../lib/metadata-readers/controller-handlers-metadata.reader';
import { ControllerMetadataReader } from '../../../lib/metadata-readers/controller-metadata.reader';

export const MOCK_TEST_CONTROLLER_PATTERN = 'test';
export const MOCK_TEST_CONTROLLER_RETURN_VALUE = 'test';

export class MockTestController {
  @MessagePattern(MOCK_TEST_CONTROLLER_PATTERN)
  public test(@Data() data: MockTestController): string {
    return MOCK_TEST_CONTROLLER_RETURN_VALUE;
  }
}

export function getMockTestControllerMetadata(): ControllerMetadata {
  return new ControllerMetadataReader(new ControllerHandlersMetadataReader()).read(new MockTestController());
}

export function getMockTestControllerParamMetadata(): HandlerParamMetadata<any>[] {
  const controllerMetadata = getMockTestControllerMetadata();

  return controllerMetadata.messageHandlers[MOCK_TEST_CONTROLLER_PATTERN].paramsMetadata;
}
