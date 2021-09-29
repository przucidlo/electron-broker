import { ListenerAdapter } from '../../../../lib/core/client/listener-adapter/listener-adapter.interface';

export function getMockListenerAdapter(): ListenerAdapter {
  return { listen: jest.fn(), removeListener: jest.fn() };
}
