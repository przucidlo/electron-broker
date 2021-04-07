import { ExecutionContext } from '../controllers/execution-context';

export interface Middleware {
  onRequest?: (context: ExecutionContext) => void | Promise<void>;
  onResponse?: (data: unknown) => void;
}
