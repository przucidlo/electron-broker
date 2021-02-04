import { isArray, isPlainObject } from 'lodash';

export default abstract class AbstractSerialization {
    public static deserialize<T>(object: T | T[]): any {
        if (Array.isArray(object)) {
            return object.map((value) => {
                return this.doDeserialization(value);
            });
        }
        return this.doDeserialization(object);
    }

    private static doDeserialization<T>(object: any): T | T[] {
        if (isPlainObject(object)) {
            const objectCopy: { [key: string]: any } = {};

            for (const key of Object.keys(object)) {
                if (isPlainObject(object[key])) {
                    objectCopy[key] = this.doDeserialization(object[key]);
                } else if (isArray(object[key])) {
                    objectCopy[key] = this.deserialize(object[key]);
                } else {
                    objectCopy[key] = this.parse(object[key]);
                }
            }
            return <T>objectCopy;
        }
        if (isArray(object)) {
            return this.deserialize(object);
        }

        return this.parse(object);
    }

    protected static parse<T>(object: T): T {
        return object;
    }
}
