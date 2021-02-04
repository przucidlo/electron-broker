import { injectable } from 'inversify';

@injectable()
export abstract class AbstractMetadataReader {
  public abstract read<T extends object, U extends keyof T>(object: U): any;

  protected isFunction(member: any): boolean {
    return typeof member === 'function';
  }
}
