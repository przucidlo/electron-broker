import { MessagePattern, Data } from 'electron-broker';

function PrefixMessagePattern(pattern: string) {
  let prefix: string = 'renderer';

  try {
    if (process) {
      prefix = process.type ?? process.env.TYPE;
    }
  } catch (err) {}

  return MessagePattern(`${prefix}-${pattern}`);
}

export class TestController {
  @PrefixMessagePattern('ping')
  public pong(): string {
    return 'pong';
  }

  @PrefixMessagePattern('forward')
  public forward(@Data() data: unknown): unknown {
    return data;
  }

  @PrefixMessagePattern('throw')
  public throw(): unknown {
    throw new Error('Mock error message');
  }

  @PrefixMessagePattern('timeout')
  public timeout(@Data() data: unknown): Promise<unknown> {
    return new Promise((res) => {
      setTimeout(() => res(data), 1000);
    });
  }
}
