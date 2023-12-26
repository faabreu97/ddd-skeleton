import { BackofficeUsersFinder } from '../../../../../../src/Contexts/Backoffice/User/application/SearchAll/BackofficeUsersFinder';
import { SearchAllBackofficeUsersQuery } from '../../../../../../src/Contexts/Backoffice/User/application/SearchAll/SearchAllBackofficeUsersQuery';
import { SearchAllBackofficeUsersQueryHandler } from '../../../../../../src/Contexts/Backoffice/User/application/SearchAll/SearchAllBackofficeUsersQueryHandler';
import { BackofficeUserRepositoryMock } from '../../__mocks__/BackofficeUserRepositoryMock';
import { BackofficeUserMother } from '../../domain/BackofficeUserMother';
import { BackofficeUsersResponseMother } from './BackofficeUsersResponseMother';

describe('SearchAllBackofficeUsers QueryHandler', () => {
  let repository: BackofficeUserRepositoryMock;

  beforeEach(() => {
    repository = new BackofficeUserRepositoryMock();
  });

  it('should find an existing users counter', async () => {
    const users = [
      BackofficeUserMother.random(),
      BackofficeUserMother.random(),
      BackofficeUserMother.random()
    ];
    repository.returnOnSearchAll(users);

    const handler = new SearchAllBackofficeUsersQueryHandler(
      new BackofficeUsersFinder(repository)
    );

    const query = new SearchAllBackofficeUsersQuery();
    const response = await handler.handle(query);

    repository.assertSearchAll();

    const expected = BackofficeUsersResponseMother.create(users);
    expect(expected).toEqual(response);
  });
});
