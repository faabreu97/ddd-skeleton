import { ChangeEmployeePasswordCommand } from '../../../../../../../src/Contexts/Backoffice/Employee/domain/ChangeEmployeePasswordCommand';
import { Primitives } from '../../../../../../../src/Contexts/Shared/domain/Primitives';
import { MotherCreator } from '../../../../../Shared/domain/MotherCreator';
import { EmployeeIdMother } from '../../../domain/EmployeeIdMother';

export class ChangeEmployeePasswordCommandMother {
  static create(
    value: Primitives<ChangeEmployeePasswordCommand>
  ): ChangeEmployeePasswordCommand {
    return new ChangeEmployeePasswordCommand(value);
  }

  static random(): ChangeEmployeePasswordCommand {
    const newPassword = MotherCreator.random().internet.password();
    const oldPassword = MotherCreator.random().internet.password();
    return this.create({
      id: EmployeeIdMother.random().value,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: newPassword
    });
  }

  static invalidConfirmation(): ChangeEmployeePasswordCommand {
    return this.create({
      id: EmployeeIdMother.random().value,
      oldPassword: MotherCreator.random().internet.password(),
      newPassword: MotherCreator.random().internet.password(),
      confirmPassword: MotherCreator.random().internet.password()
    });
  }
}
