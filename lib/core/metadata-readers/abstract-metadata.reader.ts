import { injectable } from 'inversify';

@injectable()
export abstract class AbstractMetadataReader {
  public abstract read<T extends Record<keyof T, unknown>>(object: T): any;

  public readAll<T extends Record<keyof T, unknown>>(objects: T[]): any {
    const metadata: any[] = [];

    for (const object of objects) {
      metadata.push(this.read(object));
    }

    return metadata;
  }

  protected isFunction(member: unknown): boolean {
    return typeof member === 'function';
  }
}
