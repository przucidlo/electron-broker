import { injectable } from 'inversify';

export type Constructor = new (...args: any[]) => {};

export function MessageController() {
  return injectable();
}
