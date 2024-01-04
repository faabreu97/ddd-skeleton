import { FindUserQuery } from '../../../../../../src/Contexts/Marketplace/User/application/Find/FindUserQuery';
import { FindUserQueryHandler } from '../../../../../../src/Contexts/Marketplace/User/application/Find/FindUserQueryHandler';
import { UserFinder } from '../../../../../../src/Contexts/Marketplace/User/application/Find/UserFinder';
import { UserNotFound } from '../../../../../../src/Contexts/Marketplace/User/domain/UserNotFound';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { UserMother } from '../../domain/UserMother';
import { UserResponseMother } from '../UserResponseMother';

describe('FindUser QueryHandler', () => {
  let repository: UserRepositoryMock;

  beforeEach(() => {
    repository = new UserRepositoryMock();
  });

  it('should find an existing user', async () => {
    const user = await UserMother.create();
    repository.returnOnSearch(user);

    const handler = new FindUserQueryHandler(new UserFinder(repository));
    const query = new FindUserQuery(user.id.value);

    const response = await handler.handle(query);

    repository.assertSearch();

    const expected = UserResponseMother.create(user);
    expect(expected).toEqual(response);
  });
  it('should throw error if user do not exist', async () => {
    const user = await UserMother.create();

    const handler = new FindUserQueryHandler(new UserFinder(repository));
    const query = new FindUserQuery(user.id.value);

    await expect(handler.handle(query)).rejects.toThrow(UserNotFound);

    repository.assertSearch();
  });
});
