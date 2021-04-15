import { injectable } from 'inversify';
import { Middleware } from '../..';
import ExecutionContext from '../../controllers/execution-context';

let classTransformer: any = {};

@injectable()
export class ClassTransformerMiddleware implements Middleware {
  constructor() {
    classTransformer = require('class-transformer');
  }

  public onRequest(executionContext: ExecutionContext): void {
    const paramsMetadata = executionContext.getParamMetadata();

    if (paramsMetadata) {
      for (const paramMetadata of paramsMetadata) {
        const result = paramMetadata.method(paramMetadata.options, executionContext.brokerEventData);

        paramMetadata.method = () => {
          return classTransformer.plainToClass(<any>paramMetadata.type, result, {
            enableImplicitConversion: false,
          });
        };
      }
    } else {
      throw new Error(
        'ExecutionContext is missing controller and handler, make sure you are not using the ClassTransformer in DoveClient',
      );
    }
  }
}

export default ClassTransformerMiddleware;
