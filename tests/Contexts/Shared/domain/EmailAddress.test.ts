import { EmailAddress } from '../../../../src/Contexts/Shared/domain/value-object/EmailAddress';
import { InvalidArgumentError } from '../../../../src/Contexts/Shared/domain/value-object/InvalidArgumentError';
import { EmailAddressMother } from './EmailAddressMother';

describe('EmailAddress ValueObject', () => {
  it('should create with valid value', async () => {
    const email = new EmailAddress(EmailAddressMother.random().value);
    expect(email).toBeTruthy();
  });
  it('should be lowercase and without spaces', async () => {
    const value = 'JhonDoe@gmail.com ';
    const email = new EmailAddress(value);
    expect(email.value).toEqual(value.trim().toLowerCase());
  });
  it('should not create with invalid value', async () => {
    expect(() => new EmailAddress('invalidemail')).toThrow(
      InvalidArgumentError
    );
  });
  it('should not create with empty value', async () => {
    expect(() => new EmailAddress('')).toThrow(InvalidArgumentError);
  });
});
