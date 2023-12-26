import { NewableClass } from '../../../domain/NewableClass';
import {
  PrimitivesTypes,
  ValueObject
} from '../../../domain/value-object/ValueObject';

export const ValueObjectTransformer = <T extends PrimitivesTypes>(
  ValueObject: NewableClass<ValueObject<any>>
) => {
  return {
    to: (value: ValueObject<T>): T => value.value,
    from: (value: T): ValueObject<T> => new ValueObject(value)
  };
};
