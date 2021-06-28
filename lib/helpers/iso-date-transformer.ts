import { cloneDeep } from 'lodash';

export class IsoDateTransformer {
  public static transform(target: unknown): unknown {
    if (target instanceof Date) {
      return target;
    }

    const object = cloneDeep(target);

    if (this.isObject(object) && !this.isArray(object)) {
      for (const key in object) {
        const value = object[key];

        if (this.isObject(value)) {
          object[key] = this.transform(value);
        } else {
          if (this.isValidIsoString(value)) {
            object[key] = new Date(value);
          }
        }
      }
    } else {
      if (this.isArray(object) && !this.isString(object)) {
        for (let i = 0; i < object.length; i++) {
          object[i] = this.transform(object[i]);
        }
      }

      if (this.isString(object)) {
        if (this.isValidIsoString(object)) {
          return new Date(object);
        }
      }
    }

    return object;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private static isObject(object: unknown): object is Object {
    return typeof object === 'object';
  }

  private static isArray(object: any): object is Array<any> {
    return object && object.length !== undefined;
  }

  private static isString(object: unknown): object is string {
    return typeof object === 'string';
  }

  private static isValidIsoString(value: any) {
    const isoDateStringRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

    if (typeof value === 'string') {
      const matchResult = value.match(isoDateStringRegex);

      return matchResult && matchResult.length === 1 && matchResult[0].length === value.length;
    }
    return false;
  }
}
