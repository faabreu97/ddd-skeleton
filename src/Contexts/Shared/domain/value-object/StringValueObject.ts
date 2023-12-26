import { InvalidArgumentError } from './InvalidArgumentError';
import { ValueObject } from './ValueObject';

export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsNotEmpty(value);
  }

  private ensureValueIsNotEmpty(value: string): void {
    if (value === '') {
      throw new InvalidArgumentError('Value must be defined');
    }
  }
}
