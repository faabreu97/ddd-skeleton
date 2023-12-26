import { EmployeesFinder } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Find/FindEmployees/EmployeesFinder';
import { FindEmployeesQuery } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Find/FindEmployees/FindEmployeesQuery';
import { FindEmployeesQueryHandler } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Find/FindEmployees/FindEmployeesQueryHandler';
import { EmployeeRepositoryMock } from '../../../__mocks__/EmployeeRepositoryMock';
import { EmployeeIdMother } from '../../../domain/EmployeeIdMother';
import { EmployeeMother } from '../../../domain/EmployeeMother';
import { EmployeeResponseMother } from '../../EmployeeResponseMother';

describe('FindUser QueryHandler', () => {
  let repository: EmployeeRepositoryMock;

  beforeEach(() => {
    repository = new EmployeeRepositoryMock();
  });

  it('should find all users', async () => {
    const userId = EmployeeIdMother.random();
    const user = await EmployeeMother.create();
    repository.returnOnSearch(user);

    const handler = new FindEmployeesQueryHandler(
      new EmployeesFinder(repository)
    );
    const query = new FindEmployeesQuery(userId.value);

    const response = await handler.handle(query);

    repository.assertSearchAll();

    const expected = EmployeeResponseMother.create(user);
    expect([expected]).toEqual(response);
  });
});
