import { EmailAddress } from '../../../../Shared/domain/value-object/EmailAddress';
import { BackofficeUser } from '../../domain/BackofficeUser';
import { BackofficeUserId } from '../../domain/BackofficeUserId';
import { BackofficeUserName } from '../../domain/BackofficeUserName';
import { BackofficeUserRepository } from '../../domain/BackofficeUserRepository';

export class BackofficeUserCreator {
  constructor(private repository: BackofficeUserRepository) {}

  async run(id: string, email: string, name: string) {
    const user = new BackofficeUser(
      new BackofficeUserId(id),
      new BackofficeUserName(name),
      new EmailAddress(email)
    );

    return this.repository.save(user);
  }
}
