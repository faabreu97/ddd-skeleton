import { Given } from '@cucumber/cucumber';

import { User } from '../../../../../../src/Contexts/Marketplace/User/domain/User';
import { UserId } from '../../../../../../src/Contexts/Marketplace/User/domain/UserId';
import { UserName } from '../../../../../../src/Contexts/Marketplace/User/domain/UserName';
import { UserRepository } from '../../../../../../src/Contexts/Marketplace/User/domain/UserRepository';
import { EmailAddress } from '../../../../../../src/Contexts/Shared/domain/value-object/EmailAddress';
import { Password } from '../../../../../../src/Contexts/Shared/domain/value-object/Password';
import container from '../../../../../../src/apps/marketplace/backend/dependency-injection';

const userRepository: UserRepository = container.get(
  'Marketplace.User.domain.UserRepository'
);

Given('there is the user:', async (user: any) => {
  const { id, name, email, password } = JSON.parse(user);
  const userPass = await Password.create(password);
  await userRepository.save(
    new User(
      new UserId(id),
      new UserName(name),
      new EmailAddress(email),
      userPass
    )
  );
});
