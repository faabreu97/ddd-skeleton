import { BackofficeUser } from '../../../../../src/Contexts/Backoffice/User/domain/BackofficeUser';
import { BackofficeUserId } from '../../../../../src/Contexts/Backoffice/User/domain/BackofficeUserId';
import { BackofficeUserName } from '../../../../../src/Contexts/Backoffice/User/domain/BackofficeUserName';
import { EmailAddress } from '../../../../../src/Contexts/Shared/domain/value-object/EmailAddress';
import { EmailAddressMother } from '../../../Shared/domain/EmailAddressMother';
import { BackofficeUserIdMother } from './BackofficeUserIdMother';
import { BackofficeUserNameMother } from './BackofficeUserNameMother';

export class BackofficeUserMother {
  static create(data: {
    id: BackofficeUserId;
    name: BackofficeUserName;
    email: EmailAddress;
  }): BackofficeUser {
    return new BackofficeUser(data.id, data.name, data.email);
  }

  static random(): BackofficeUser {
    return this.create({
      id: BackofficeUserIdMother.random(),
      name: BackofficeUserNameMother.random(),
      email: EmailAddressMother.random()
    });
  }
}
