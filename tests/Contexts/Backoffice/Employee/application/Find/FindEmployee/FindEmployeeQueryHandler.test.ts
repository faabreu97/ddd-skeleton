import { EmployeeFinder } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Find/FindEmployee/EmployeeFinder';
import { FindEmployeeQuery } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Find/FindEmployee/FindEmployeeQuery';
import { FindEmployeeQueryHandler } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Find/FindEmployee/FindEmployeeQueryHandler';
import { EmployeeNotFound } from '../../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeNotFound';
import { EmployeeRepositoryMock } from '../../../__mocks__/EmployeeRepositoryMock';
import { EmployeeMother } from '../../../domain/EmployeeMother';
import { EmployeeResponseMother } from '../../EmployeeResponseMother';

describe('FindEmployee QueryHandler', () => {
  let repository: EmployeeRepositoryMock;

  beforeEach(() => {
    repository = new EmployeeRepositoryMock();
  });

  it('should find an existing user', async () => {
    const user = await EmployeeMother.create();
    repository.returnOnSearch(user);

    const handler = new FindEmployeeQueryHandler(
      new EmployeeFinder(repository)
    );
    const query = new FindEmployeeQuery(user.id.value);

    const response = await handler.handle(query);

    repository.assertSearch();

    const expected = EmployeeResponseMother.create(user);
    expect(expected).toEqual(response);
  });
  it('should throw error if user do not exist', async () => {
    const user = await EmployeeMother.create();

    const handler = new FindEmployeeQueryHandler(
      new EmployeeFinder(repository)
    );
    const query = new FindEmployeeQuery(user.id.value);

    await expect(handler.handle(query)).rejects.toThrow(EmployeeNotFound);

    repository.assertSearch();
  });
});
