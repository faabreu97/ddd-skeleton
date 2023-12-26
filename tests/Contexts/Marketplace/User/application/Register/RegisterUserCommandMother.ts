import { RegisterUserCommand } from '../../../../../../src/Contexts/Marketplace/User/domain/RegisterUserCommand';
import { Primitives } from '../../../../../../src/Contexts/Shared/domain/Primitives';
import { EmailAddressMother } from '../../../../Shared/domain/EmailAddressMother';
import { PasswordMother } from '../../../../Shared/domain/PasswordMother';
import { UserIdMother } from '../../domain/UserIdMother';
import { UserNameMother } from '../../domain/UserNameMother';

export class RegisterUserCommandMother {
  static create(value: Primitives<RegisterUserCommand>): RegisterUserCommand {
    return new RegisterUserCommand(value);
  }

  static random(data?: Partial<RegisterUserCommand>): RegisterUserCommand {
    return this.create({
      id: data?.id ?? UserIdMother.random().value,
      name: data?.name ?? UserNameMother.random().value,
      email: data?.email ?? EmailAddressMother.random().value,
      password: data?.password ?? PasswordMother.random()
    });
  }
}
