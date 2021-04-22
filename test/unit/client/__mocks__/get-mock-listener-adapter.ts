export function getMockListenerAdapter() {
  return { listen: jest.fn(), removeListener: jest.fn() };
}
