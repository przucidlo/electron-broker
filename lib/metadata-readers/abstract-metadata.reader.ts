import { injectable } from 'inversify';

@injectable()
export abstract class AbstractMetadataReader {
  public abstract read<T extends Record<any, unknown>, U extends keyof T>(object: U): any;

  public readAll<T extends Record<any, unknown>, U extends keyof T>(objects: U[]): any {
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
