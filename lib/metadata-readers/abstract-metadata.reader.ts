import { injectable } from 'inversify';

@injectable()
export abstract class AbstractMetadataReader {
  public abstract read(object: Record<any, unknown>): any;

  public readAll(objects: Record<any, unknown>[]): any {
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
