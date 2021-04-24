export const mockProcess = jest.fn().mockImplementation(
  (): Partial<NodeJS.Process> => ({
    send: jest.fn(),
    on: jest.fn(),
  }),
);
