import { Password } from '../../../../src/Contexts/Shared/domain/value-object/Password';
import { MotherCreator } from './MotherCreator';

export class PasswordMother {
  static async create(value?: string): Promise<Password> {
    return Password.create(value ?? this.random());
  }

  static random(): string {
    return MotherCreator.random().internet.password();
  }
}
