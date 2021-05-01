import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { injectable } from 'inversify';
import { BrokerEvent } from '../interfaces/broker-event.interface';
import { ClassType } from '../types/class.type';
import DoveClient from './dove.client';
import { BrokerEventSubscriber } from './event-subscriber/broker-event-subscriber';

@injectable()
export default class TransformableDoveClient extends DoveClient {
  private classTransformOptions?: ClassTransformOptions;

  public setClassTransformOptions(classTransformOptions: ClassTransformOptions): void {
    this.classTransformOptions = classTransformOptions;
  }

  public async invoke<T>(pattern: string, data: unknown, target?: ClassType<T>): Promise<T> {
    const response = await super.invoke(pattern, data);

    return plainToClass(target, response, this.classTransformOptions);
  }

  public subscribe<T>(
    pattern: string,
    listener: (data: T, brokerEvent?: BrokerEvent) => void,
    target?: ClassType<T>,
  ): BrokerEventSubscriber {
    return super.subscribe(pattern, (data, brokerEvent) => {
      return listener(plainToClass(target, data, this.classTransformOptions), brokerEvent);
    });
  }
}
