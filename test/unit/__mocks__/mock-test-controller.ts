import { injectable } from 'inversify';
import { Data } from '../../../lib';
import MessagePattern from '../../../lib/core/decorators/message-pattern.decorator';
import { ControllerHandlerMetadata } from '../../../lib/core/interfaces/controller-handler-metadata.interface';
import { ControllerMetadata } from '../../../lib/core/interfaces/controller-metadata.interface';
import { HandlerParamMetadata } from '../../../lib/core/interfaces/handler-param-metadata.interface';
import { ControllerHandlersMetadataReader } from '../../../lib/core/metadata-readers/controller-handlers-metadata.reader';
import { ControllerMetadataReader } from '../../../lib/core/metadata-readers/controller-metadata.reader';

export const MOCK_TEST_CONTROLLER_PATTERN = 'test';
export const MOCK_TEST_CONTROLLER_RETURN_VALUE = 'test';

@injectable()
export class MockTestController {
  @MessagePattern(MOCK_TEST_CONTROLLER_PATTERN)
  public test(@Data() data: MockTestController): string {
    return MOCK_TEST_CONTROLLER_RETURN_VALUE;
  }
}

export function getMockTestControllerMetadata(): ControllerMetadata {
  return new ControllerMetadataReader(
    new ControllerHandlersMetadataReader(),
  ).read(new MockTestController());
}

export function getMockTestControllerHandlerMetadata(): ControllerHandlerMetadata {
  const controllerMetadata = getMockTestControllerMetadata();

  return controllerMetadata.messageHandlers[MOCK_TEST_CONTROLLER_PATTERN];
}

export function getMockTestControllerParamMetadata(): HandlerParamMetadata<any>[] {
  return getMockTestControllerHandlerMetadata().paramsMetadata;
}
