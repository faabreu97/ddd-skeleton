import { UserId } from '../../domain/UserId';
import { UserNotFound } from '../../domain/UserNotFound';
import { UserRepository } from '../../domain/UserRepository';

export class UserFinder {
  constructor(private repository: UserRepository) {}

  async run(id: string) {
    const user = await this.repository.search(new UserId(id));

    if (!user) throw new UserNotFound();

    return user;
  }
}
