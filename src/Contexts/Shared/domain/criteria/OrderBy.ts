import { ValueObject } from '../value-object/ValueObject';

export class OrderBy extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}
