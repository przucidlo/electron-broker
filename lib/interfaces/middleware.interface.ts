import { ExecutionContext } from '../controllers/execution-context';

export default interface Middleware {
  onRequest?: (context: ExecutionContext) => void | Promise<void>;
  onResponse?: (data: unknown) => unknown | Promise<unknown>;
}
