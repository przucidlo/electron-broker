import MessagePattern from '../../../lib/decorators/message-pattern.decorator';
import { ControllerMetadata } from '../../../lib/interfaces/controller-metadata.interface';
import { ControllerHandlersMetadataReader } from '../../../lib/metadata-readers/controller-handlers-metadata.reader';
import { ControllerMetadataReader } from '../../../lib/metadata-readers/controller-metadata.reader';

export const MOCK_TEST_CONTROLLER_PATTERN = 'test';
export const MOCK_TEST_CONTROLLER_RETURN_VALUE = 'test';

export class MockTestController {
  @MessagePattern(MOCK_TEST_CONTROLLER_PATTERN)
  public test(): string {
    return MOCK_TEST_CONTROLLER_RETURN_VALUE;
  }
}

export function getMockTestControllerMetadata(): ControllerMetadata {
  return new ControllerMetadataReader(new ControllerHandlersMetadataReader()).read(new MockTestController());
}
