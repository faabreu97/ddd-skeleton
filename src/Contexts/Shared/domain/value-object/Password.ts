import { EmployeePasswordInvalid } from '../../../Backoffice/Employee/domain/EmployeePasswordInvalid';
import { TextEncrypter } from '../../infrastructure/TextEncrypter';
import { StringValueObject } from './StringValueObject';

export class Password extends StringValueObject {
  static async create(value: string) {
    this.ensureIsValidPassword(value);
    const encryptedValue = await this.encryptValue(value);
    return new Password(encryptedValue);
  }

  static fromPrimitives(value: string) {
    return new Password(value);
  }

  public compareValue(value: string): Promise<boolean> {
    return TextEncrypter.compare(this.value, value);
  }

  private static encryptValue(value: string): Promise<string> {
    return TextEncrypter.encrypt(value);
  }

  private static ensureIsValidPassword(value: string): void {
    if (value.length < 8) {
      throw new EmployeePasswordInvalid(
        `Password must be at least 8 characters`
      );
    }
  }
}
