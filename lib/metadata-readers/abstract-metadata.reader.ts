import { injectable } from 'inversify';

@injectable()
export abstract class AbstractMetadataReader {
  public abstract read<T extends object, U extends keyof T>(object: U): any;

  public readAll<T extends object, U extends keyof T>(objects: U[]): any {
    let metadata: any[] = [];

    for (const object of objects) {
      metadata.push(object);
    }

    return metadata;
  }

  protected isFunction(member: any): boolean {
    return typeof member === 'function';
  }
}