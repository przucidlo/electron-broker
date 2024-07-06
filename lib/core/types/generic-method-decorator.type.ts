export type GenericMethodDecorator<T> = (
  target: unknown,
  property: string,
  descriptor: TypedPropertyDescriptor<T>,
) => void;
