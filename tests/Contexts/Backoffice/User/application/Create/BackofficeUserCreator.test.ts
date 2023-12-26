import { BackofficeUserCreator } from '../../../../../../src/Contexts/Backoffice/User/application/Create/BackofficeUserCreator';
import { BackofficeUserRepositoryMock } from '../../__mocks__/BackofficeUserRepositoryMock';
import { BackofficeUserMother } from '../../domain/BackofficeUserMother';

describe('BackofficeUserCreator', () => {
  it('creates a backoffice user', async () => {
    const user = BackofficeUserMother.random();

    const repository = new BackofficeUserRepositoryMock();
    const applicationService = new BackofficeUserCreator(repository);

    await applicationService.run(
      user.id.toString(),
      user.email.toString(),
      user.name.toString()
    );

    repository.assertSaveHaveBeenCalledWith(user);
  });
});
