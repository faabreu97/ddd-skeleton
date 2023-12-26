import { EmployeeRemover } from '../../../../../../src/Contexts/Backoffice/Employee/application/Remove/EmployeeRemover';
import { RemoveEmployeeCommandHandler } from '../../../../../../src/Contexts/Backoffice/Employee/application/Remove/RemoveEmployeeCommandHandler';
import { EmployeeRoles } from '../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRole';
import { ForbiddenError } from '../../../../../../src/Contexts/Shared/domain/ForbiddenError';
import { EmployeeRepositoryMock } from '../../__mocks__/EmployeeRepositoryMock';
import { EmployeeMother } from '../../domain/EmployeeMother';
import { RemoveEmployeeCommandMother } from './RemoveEmployeeCommandMother';

let repository: EmployeeRepositoryMock;
let remover: EmployeeRemover;
let handler: RemoveEmployeeCommandHandler;

beforeEach(() => {
  repository = new EmployeeRepositoryMock();
  remover = new EmployeeRemover(repository);
  handler = new RemoveEmployeeCommandHandler(remover);
});

describe('RemoveEmployeeCommandHandler', () => {
  it('should remove a employee', async () => {
    const command = RemoveEmployeeCommandMother.random();
    const employee = await EmployeeMother.create({ id: command.employeeId });
    repository.returnOnSearch(employee);

    await handler.handle(command);

    repository.assertSearch(2);
    repository.assertRemove();
  });
  it('should not remove my account', async () => {
    const command = RemoveEmployeeCommandMother.invalidWithSameIds();

    await expect(handler.handle(command)).rejects.toThrow(ForbiddenError);
  });
  it('should not remove a employee as admin', async () => {
    const command = RemoveEmployeeCommandMother.random();
    const employee = await EmployeeMother.create({
      id: command.employeeId,
      role: EmployeeRoles.admin
    });
    repository.returnOnSearch(employee);

    await expect(handler.handle(command)).rejects.toThrow(ForbiddenError);

    repository.assertSearch();
  });
  it('should not remove a employee as read', async () => {
    const command = RemoveEmployeeCommandMother.random();
    const employee = await EmployeeMother.create({
      id: command.employeeId,
      role: EmployeeRoles.read
    });
    repository.returnOnSearch(employee);

    await expect(handler.handle(command)).rejects.toThrow(ForbiddenError);

    repository.assertSearch();
  });
});
