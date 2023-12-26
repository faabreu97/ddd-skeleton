import { EmailAddress } from '../../../../src/Contexts/Shared/domain/value-object/EmailAddress';
import { MotherCreator } from './MotherCreator';

export class EmailAddressMother {
  static create(value: string): EmailAddress {
    return new EmailAddress(value);
  }

  static random(): EmailAddress {
    return this.create(MotherCreator.random().internet.email());
  }
}
