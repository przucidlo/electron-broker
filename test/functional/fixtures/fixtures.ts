import { test as base, _electron as electron } from '@playwright/test';
import { BrokerPage } from './broker-page';
import path from 'path';

export interface Fixtures {
  brokerPage: BrokerPage;
}

export const test = base.extend<Fixtures>({
  brokerPage: [
    async ({}, use) => {
      const app = await electron.launch({
        args: [
          path.join(
            __dirname,
            '../app/out/app-darwin-arm64/app.app/Contents/Resources/app/.vite/build/main.js',
          ),
        ],
        env: {
          ...process.env,
          NODE_ENV: 'development',
        },
      });

      const brokerPage = new BrokerPage(await app.firstWindow());

      await use(brokerPage);

      await app.close();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
