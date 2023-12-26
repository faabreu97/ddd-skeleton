import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Primitives } from '../../../Shared/domain/Primitives';
import { EmailAddress } from '../../../Shared/domain/value-object/EmailAddress';
import { Password } from '../../../Shared/domain/value-object/Password';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserRegisteredDomainEvent } from './UserRegisteredDomainEvent';

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly name: UserName;
  readonly email: EmailAddress;
  readonly password: Password;

  constructor(
    id: UserId,
    name: UserName,
    email: EmailAddress,
    password: Password
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async create(plainData: {
    id: string;
    name: string;
    email: string;
    password: string;
  }) {
    const password = await Password.create(plainData.password);
    const user = new User(
      new UserId(plainData.id),
      new UserName(plainData.name),
      new EmailAddress(plainData.email),
      password
    );

    user.record(
      new UserRegisteredDomainEvent({
        aggregateId: user.id.value,
        name: user.name.value,
        email: user.email.value
      })
    );

    return user;
  }

  public passwordMatch(value: string) {
    return this.password.compareValue(value);
  }

  static fromPrimitives(data: Primitives<User>) {
    return new User(
      new UserId(data.id),
      new UserName(data.name),
      new EmailAddress(data.email),
      new Password(data.password)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    };
  }
}
