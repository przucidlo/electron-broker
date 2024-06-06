import { Page } from 'playwright-core';

declare const window: Window;

export class BrokerPage {
  constructor(public page: Page) {}

  public async invoke(pattern: string, data: unknown): Promise<unknown> {
    return await this.page.evaluate(
      async ({ pattern, data }) => {
        const client = window.broker.createClient();

        client.setTimeout(3);

        return client.invoke(pattern, data);
      },
      { pattern, data },
    );
  }

  public async send(pattern: string, data: unknown): Promise<void> {
    return await this.page.evaluate(
      async ({ pattern, data }) => {
        window.broker.createClient().send(pattern, data);
      },
      { pattern, data },
    );
  }

  public async subscribe(pattern: string, quitAfter = 1): Promise<unknown[]> {
    return await this.page.evaluate(
      async ({ pattern, quitAfter }) => {
        const responses = [];

        await new Promise((res) => {
          const sub = window.broker
            .createClient()
            .subscribe(pattern, (data) => {
              responses.push(data);

              if (responses.length === quitAfter) {
                res(sub.unsubscribe());
              }
            });
        });

        return responses;
      },
      { pattern, quitAfter },
    );
  }
}
