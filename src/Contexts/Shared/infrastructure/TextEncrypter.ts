// import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;
export class TextEncrypter {
  static encrypt(value: string): Promise<string> {
    const hash = bcrypt.hash(value, saltRounds);
    return hash;
  }

  static compare(encryptedValue: string, value: string): Promise<boolean> {
    return bcrypt.compare(value, encryptedValue);
  }
}
