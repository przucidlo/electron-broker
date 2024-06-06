import { test, expect } from './fixtures/fixtures';

['browser', 'renderer', 'childProcess'].forEach((process) => {
  test.describe(`Communication between renderer and ${process}`, () => {
    test.describe('client', () => {
      test('should receive response', async ({ brokerPage }) => {
        const response = await brokerPage.invoke(`${process}-ping`, {});

        expect(response).toEqual('pong');
      });

      test('should receive deserialized payload', async ({ brokerPage }) => {
        const data = { foo: 'bar', one: 1, truth: true, empty: null };
        const response = await brokerPage.invoke(`${process}-forward`, data);

        expect(response).toStrictEqual(data);
      });

      test('should receive remote async response', async ({ brokerPage }) => {
        const data = 'test';
        const response = await brokerPage.invoke(`${process}-timeout`, data);

        expect(response).toEqual(data);
      });

      test('should throw forwarded error', async ({ brokerPage }) => {
        const response = brokerPage.invoke(`${process}-throw`, {});

        expect(response).rejects.toThrow();
      });

      if (process === 'renderer') {
        test('should subscribe for pattern', async ({ brokerPage }) => {
          const [response] = await Promise.all([
            brokerPage.subscribe('test', 2),
            brokerPage.send('test', 1),
            brokerPage.send('test', 2),
          ]);

          expect(response).toHaveLength(2);
        });
      }
    });
  });
});
