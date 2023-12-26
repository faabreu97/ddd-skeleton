import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Primitives } from '../../../Shared/domain/Primitives';
import { EmailAddress } from '../../../Shared/domain/value-object/EmailAddress';
import { BackofficeUserId } from './BackofficeUserId';
import { BackofficeUserName } from './BackofficeUserName';

export class BackofficeUser extends AggregateRoot {
  readonly id: BackofficeUserId;
  readonly name: BackofficeUserName;
  readonly email: EmailAddress;

  constructor(
    id: BackofficeUserId,
    name: BackofficeUserName,
    email: EmailAddress
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static fromPrimitives(data: Primitives<BackofficeUser>) {
    return new BackofficeUser(
      new BackofficeUserId(data.id),
      new BackofficeUserName(data.name),
      new EmailAddress(data.email)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value
    };
  }
}
