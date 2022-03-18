import { ListenerAdapter } from '../../../../lib/core/client/listener-adapter/listener-adapter.interface';
import { IpcListener } from '../../../../lib/core/client/response-listener/ipc-listener';

export function getMockListenerAdapter(): IpcListener {
  return <IpcListener>(
    (<unknown>{ listen: jest.fn(), removeListener: jest.fn() })
  );
}
