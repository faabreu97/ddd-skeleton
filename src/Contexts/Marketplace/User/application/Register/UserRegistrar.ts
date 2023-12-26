import { EventBus } from '../../../../Shared/domain/EventBus';
import { EmailAddress } from '../../../../Shared/domain/value-object/EmailAddress';
import { User } from '../../domain/User';
import { UserAlreadyExist } from '../../domain/UserAlreadyExist';
import { UserId } from '../../domain/UserId';
import { UserIdAlreadyExist } from '../../domain/UserIdAlreadyExist';
import { UserRepository } from '../../domain/UserRepository';

export class UserRegistrar {
  constructor(
    private repository: UserRepository,
    private eventBus: EventBus
  ) {}

  async run(params: {
    id: string;
    name: string;
    email: string;
    password: string;
  }): Promise<void> {
    let userExist = await this.repository.search(new UserId(params.id));
    if (userExist)
      throw new UserIdAlreadyExist(
        `There is already a user with id <${params.id}>`
      );
    userExist = await this.repository.searchByEmail(
      new EmailAddress(params.email)
    );
    if (userExist) throw new UserAlreadyExist('Email already exist');

    const user = await User.create(params);

    await this.repository.save(user);

    await this.eventBus.publish(user.pullDomainEvents());
  }
}
