import { InvalidArgumentError } from './InvalidArgumentError';
import { StringValueObject } from './StringValueObject';

export class EmailAddress extends StringValueObject {
  constructor(value: string) {
    const formattedValue = value.trim().toLowerCase();
    super(formattedValue);
    this.ensureIsValidEmail(formattedValue);
  }

  private ensureIsValidEmail(value: string) {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value.match(regex)) throw new InvalidArgumentError('Invalid email');
  }
}
