import { isValid, parseJSON } from 'date-fns';
import AbstractSerialization from './abstract/AbstractSerialization';

export class DateSerialization extends AbstractSerialization {
    protected static parse<T>(object: T): T {
        return this.toDate(object);
    }

    private static toDate(value: any): any {
        if (typeof value === 'string') {
            // Using regex to check if string contains
            // data that is a date.
            const date = parseJSON(value);

            if (isValid(date)) {
                return date;
            }
        }
        return value;
    }
}
