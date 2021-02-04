import AbstractSerialization from './abstract/AbstractSerialization';
import { DateSerialization } from './DateSerialization';

export class IpcMessageSerialization extends AbstractSerialization {
    protected static parse<T>(object: T): T {
        return DateSerialization.deserialize(object);
    }
}
