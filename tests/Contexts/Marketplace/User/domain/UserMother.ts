import { RegisterUserCommand } from '../../../../../src/Contexts/Marketplace/User/domain/RegisterUserCommand';
import { User } from '../../../../../src/Contexts/Marketplace/User/domain/User';
import { EmailAddressMother } from '../../../Shared/domain/EmailAddressMother';
import { PasswordMother } from '../../../Shared/domain/PasswordMother';
import { UserIdMother } from './UserIdMother';
import { UserNameMother } from './UserNameMother';

export class UserMother {
  static create(plainData?: {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
  }): Promise<User> {
    return User.create({
      id: plainData?.id ?? UserIdMother.random().value,
      name: plainData?.name ?? UserNameMother.random().value,
      email: plainData?.email ?? EmailAddressMother.random().value,
      password: plainData?.password ?? PasswordMother.random()
    });
  }

  static async from(command: RegisterUserCommand): Promise<User> {
    const userPass = await PasswordMother.create(command.password);
    return new User(
      UserIdMother.create(command.id),
      UserNameMother.create(command.name),
      EmailAddressMother.create(command.email),
      userPass
    );
  }

  static async random(): Promise<User> {
    const userPass = await PasswordMother.create();
    return new User(
      UserIdMother.random(),
      UserNameMother.random(),
      EmailAddressMother.random(),
      userPass
    );
  }
}
