import { injectable } from 'inversify';
import { Middleware } from '../..';
import ExecutionContext from '../../controllers/execution-context';
import { ClassTransformOptions, plainToClass } from 'class-transformer';

@injectable()
export class ParamTransformerMiddleware implements Middleware {
  constructor(private transformOptions?: ClassTransformOptions) {}

  public onRequest(executionContext: ExecutionContext): void {
    const paramsMetadata = executionContext.getParamMetadata();

    if (paramsMetadata) {
      for (const paramMetadata of paramsMetadata) {
        const result = paramMetadata.method(paramMetadata.options, executionContext.brokerEvent);

        paramMetadata.method = () => {
          return plainToClass(<any>paramMetadata.type, result, this.transformOptions);
        };
      }
    } else {
      throw new Error(
        'ExecutionContext is missing paramMetadata, make sure you are not using the ClassTransformer in DoveClient',
      );
    }
  }
}

export default ParamTransformerMiddleware;
