import { injectable } from 'inversify';

@injectable()
export abstract class AbstractMetadataReader {
  public abstract read<T extends Record<string, unknown>>(object: T): any;

  public readAll<T extends Record<string, unknown>, U extends keyof T>(objects: U[]): any {
    const metadata: any[] = [];

    for (const object of objects) {
      metadata.push(object);
    }

    return metadata;
  }

  protected isFunction(member: unknown): boolean {
    return typeof member === 'function';
  }
}
