import { ExecutionContext } from '../../../lib';
import { BROKER_EVENT } from '../../../lib/constants/channels';
import { BrokerEvent } from '../../../lib/interfaces/broker-event.interface';
import { IpcTransport } from '../../../lib/interfaces/ipc-transport.interface';
import { ResultBroadcastMiddleware } from '../../../lib/middleware/internal/result-broadcast.middleware';
import { getMockBrokerEventData } from '../__mocks__/get-mock-broker-event-data';
import { getMockIpcTransport } from '../__mocks__/get-mock-ipc-transport';

describe('ResultBroadcastMiddleware', () => {
  let middleware: ResultBroadcastMiddleware;
  let ipcTransport: IpcTransport;
  let fakeExecutionContext: ExecutionContext;

  beforeEach(() => {
    ipcTransport = getMockIpcTransport();
    middleware = new ResultBroadcastMiddleware(ipcTransport);

    fakeExecutionContext = <ExecutionContext>{ brokerEvent: getMockBrokerEventData() };
  });

  it('Should broadcast controller response using ipcTransport.send', () => {
    middleware.onRequest(fakeExecutionContext);
    middleware.onResponse({});

    expect(ipcTransport.send).toBeCalled();
  });

  it('Should change brokerEvent to be a response containing controller result', () => {
    const mockData = '123';
    const expectedBrokerEventData: BrokerEvent = { ...getMockBrokerEventData(), type: 'RESPONSE', data: mockData };

    middleware.onRequest(fakeExecutionContext);
    middleware.onResponse(mockData);

    expect(ipcTransport.send).toBeCalledWith(BROKER_EVENT, expect.objectContaining(expectedBrokerEventData));
  });
});
