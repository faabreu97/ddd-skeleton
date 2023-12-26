import { ChangeEmployeePasswordCommandHandler } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Edit/EmployeePasswordEditor/ChangeEmployeePasswordCommandHandler';
import { EmployeePasswordEditor } from '../../../../../../../src/Contexts/Backoffice/Employee/application/Edit/EmployeePasswordEditor/EmployeePasswordEditor';
import { EmployeePasswordDoNotMatch } from '../../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeePasswordDoNotMatch';
import { EmployeeRepositoryMock } from '../../../__mocks__/EmployeeRepositoryMock';
import { EmployeeMother } from '../../../domain/EmployeeMother';
import { ChangeEmployeePasswordCommandMother } from './ChangeEmployeePasswordCommandMother';

let repository: EmployeeRepositoryMock;
let editor: EmployeePasswordEditor;
let handler: ChangeEmployeePasswordCommandHandler;

beforeEach(() => {
  repository = new EmployeeRepositoryMock();
  editor = new EmployeePasswordEditor(repository);
  handler = new ChangeEmployeePasswordCommandHandler(editor);
});

describe('ChangeEmployeePasswordCommandHandler', () => {
  it('should change user password', async () => {
    const command = ChangeEmployeePasswordCommandMother.random();
    const user = await EmployeeMother.create({ password: command.oldPassword });
    repository.returnOnSearch(user);

    await handler.handle(command);

    repository.assertSave();
  });
  it('should not change user password when password do not match', async () => {
    const command = ChangeEmployeePasswordCommandMother.random();
    const user = await EmployeeMother.random();
    repository.returnOnSearch(user);

    await expect(() => handler.handle(command)).rejects.toThrow(
      EmployeePasswordDoNotMatch
    );
  });
  it('should not change user password when confirm password do not match', async () => {
    const command = ChangeEmployeePasswordCommandMother.invalidConfirmation();
    const user = await EmployeeMother.create({ password: command.oldPassword });
    repository.returnOnSearch(user);

    await expect(() => handler.handle(command)).rejects.toThrow(
      EmployeePasswordDoNotMatch
    );
  });
});
