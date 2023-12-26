import { LoginEmployeeFinder } from '../../../../../../src/Contexts/Backoffice/Employee/application/Login/LoginEmployeeFinder';
import { LoginEmployeeQuery } from '../../../../../../src/Contexts/Backoffice/Employee/application/Login/LoginEmployeeQuery';
import { LoginEmployeeQueryHandler } from '../../../../../../src/Contexts/Backoffice/Employee/application/Login/LoginEmployeeQueryHandler';
import { EmployeeNotFound } from '../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeNotFound';
import { EmployeePasswordDoNotMatch } from '../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeePasswordDoNotMatch';
import { PasswordMother } from '../../../../Shared/domain/PasswordMother';
import { EmployeeRepositoryMock } from '../../__mocks__/EmployeeRepositoryMock';
import { EmployeeMother } from '../../domain/EmployeeMother';
import { EmployeeResponseMother } from '../EmployeeResponseMother';

describe('LoginUser QueryHandler', () => {
  let repository: EmployeeRepositoryMock;

  beforeEach(() => {
    repository = new EmployeeRepositoryMock();
  });

  it('should login an existing user', async () => {
    const password = await PasswordMother.create();
    const employee = await EmployeeMother.create({ password: password.value });
    repository.returnOnSearch(employee);

    const handler = new LoginEmployeeQueryHandler(
      new LoginEmployeeFinder(repository)
    );

    const query = new LoginEmployeeQuery(employee.email.value, password.value);
    const response = await handler.handle(query);

    repository.assertSearchByEmail();

    const expected = EmployeeResponseMother.create(employee);
    expect(expected).toEqual(response);
  });
  it('should not login if user do not exist', async () => {
    const password = await PasswordMother.create();
    const employee = await EmployeeMother.create({ password: password.value });

    const handler = new LoginEmployeeQueryHandler(
      new LoginEmployeeFinder(repository)
    );

    const query = new LoginEmployeeQuery(employee.email.value, password.value);
    await expect(handler.handle(query)).rejects.toThrow(EmployeeNotFound);

    repository.assertSearchByEmail();
  });
  it('should not login if user password do not match', async () => {
    const password = await PasswordMother.create();
    const employee = await EmployeeMother.create();
    repository.returnOnSearch(employee);

    const handler = new LoginEmployeeQueryHandler(
      new LoginEmployeeFinder(repository)
    );

    const query = new LoginEmployeeQuery(employee.email.value, password.value);
    await expect(handler.handle(query)).rejects.toThrow(
      EmployeePasswordDoNotMatch
    );

    repository.assertSearchByEmail();
  });
});
