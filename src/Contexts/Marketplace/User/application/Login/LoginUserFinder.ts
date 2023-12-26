import { EmailAddress } from '../../../../Shared/domain/value-object/EmailAddress';
import { UserNotFound } from '../../domain/UserNotFound';
import { UserPasswordDoNotMatch } from '../../domain/UserPasswordDoNotMatch';
import { UserRepository } from '../../domain/UserRepository';

export class LoginUserFinder {
  constructor(private repository: UserRepository) {}

  async run(email: string, password: string) {
    const user = await this.repository.searchByEmail(new EmailAddress(email));
    if (!user) throw new UserNotFound('Credentials incorrect');

    const passMath = await user.passwordMatch(password);
    if (!passMath) throw new UserPasswordDoNotMatch('Credentials incorrect');

    return user;
  }
}
