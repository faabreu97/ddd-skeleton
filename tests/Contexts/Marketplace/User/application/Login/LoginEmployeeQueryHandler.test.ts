import { LoginUserFinder } from '../../../../../../src/Contexts/Marketplace/User/application/Login/LoginUserFinder';
import { LoginUserQuery } from '../../../../../../src/Contexts/Marketplace/User/application/Login/LoginUserQuery';
import { LoginUserQueryHandler } from '../../../../../../src/Contexts/Marketplace/User/application/Login/LoginUserQueryHandler';
import { UserNotFound } from '../../../../../../src/Contexts/Marketplace/User/domain/UserNotFound';
import { UserPasswordDoNotMatch } from '../../../../../../src/Contexts/Marketplace/User/domain/UserPasswordDoNotMatch';
import { PasswordMother } from '../../../../Shared/domain/PasswordMother';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { UserMother } from '../../domain/UserMother';
import { UserResponseMother } from '../UserResponseMother';

describe('LoginUser QueryHandler', () => {
  let repository: UserRepositoryMock;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  });

  it('should login an existing user', async () => {
    const password = await PasswordMother.create();
    const user = await UserMother.create({ password: password.value });
    repository.returnOnSearch(user);

    const handler = new LoginUserQueryHandler(new LoginUserFinder(repository));

    const query = new LoginUserQuery(user.email.value, password.value);
    const response = await handler.handle(query);

    repository.assertSearchByEmail();

    const expected = UserResponseMother.create(user);
    expect(expected).toEqual(response);
  });
  it('should not login if user do not exist', async () => {
    const password = await PasswordMother.create();
    const user = await UserMother.create({ password: password.value });

    const handler = new LoginUserQueryHandler(new LoginUserFinder(repository));

    const query = new LoginUserQuery(user.email.value, password.value);
    await expect(handler.handle(query)).rejects.toThrow(UserNotFound);

    repository.assertSearchByEmail();
  });
  it('should not login if user password do not match', async () => {
    const password = await PasswordMother.create();
    const user = await UserMother.create();
    repository.returnOnSearch(user);

    const handler = new LoginUserQueryHandler(new LoginUserFinder(repository));

    const query = new LoginUserQuery(user.email.value, password.value);
    await expect(handler.handle(query)).rejects.toThrow(UserPasswordDoNotMatch);

    repository.assertSearchByEmail();
  });
});
