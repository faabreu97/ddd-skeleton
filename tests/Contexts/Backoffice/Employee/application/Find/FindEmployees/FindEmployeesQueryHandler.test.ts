import { EmployeesFinder } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Find/FindEmployees/EmployeesFinder';
import { FindEmployeesQuery } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Find/FindEmployees/FindEmployeesQuery';
import { FindEmployeesQueryHandler } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Find/FindEmployees/FindEmployeesQueryHandler';
import { EmployeeRoles } from '../../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRole';
import { EmployeeRepositoryMock } from '../../../__mocks__/EmployeeRepositoryMock';
import { EmployeeMother } from '../../../domain/EmployeeMother';
import { EmployeeResponseMother } from '../../EmployeeResponseMother';

describe('FindUser QueryHandler', () => {
  let repository: EmployeeRepositoryMock;

  beforeEach(() => {
    repository = new EmployeeRepositoryMock();
  });

  it('should find all users', async () => {
    const user = await EmployeeMother.create({ role: EmployeeRoles.owner });
    const userToFind = await EmployeeMother.create();
    repository.returnOnSearch(userToFind);
    repository.returnOnSearch(user);

    const handler = new FindEmployeesQueryHandler(
      new EmployeesFinder(repository)
    );
    const query = new FindEmployeesQuery(user.id.value);

    const response = await handler.handle(query);

    repository.assertSearchAll();

    const expected = EmployeeResponseMother.create(userToFind);
    expect([expected]).toEqual(response);
  });
});
