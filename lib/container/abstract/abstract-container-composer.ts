import { Container } from 'inversify';

export abstract class AbstractContainerComposer {
  constructor(protected container: Container) {}

  public abstract compose(): Promise<void> | void;
}
