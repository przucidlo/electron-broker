import { injectable } from 'inversify';

export function MessageController(): (target: any) => void {
  return injectable();
}
