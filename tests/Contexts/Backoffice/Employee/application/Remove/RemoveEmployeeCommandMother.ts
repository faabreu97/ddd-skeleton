import { RemoveEmployeeCommand } from '../../../../../../src/Contexts/Backoffice/Employee/domain/RemoveEmployeeCommand';
import { Primitives } from '../../../../../../src/Contexts/Shared/domain/Primitives';
import { EmployeeIdMother } from '../../domain/EmployeeIdMother';

export class RemoveEmployeeCommandMother {
  static create(
    value: Primitives<RemoveEmployeeCommand>
  ): RemoveEmployeeCommand {
    return new RemoveEmployeeCommand(value);
  }

  static random(data?: Partial<RemoveEmployeeCommand>): RemoveEmployeeCommand {
    return this.create({
      employeeId: EmployeeIdMother.random().value,
      idToDelete: EmployeeIdMother.random().value,
      ...data
    });
  }

  static invalidWithSameIds(): RemoveEmployeeCommand {
    const id = EmployeeIdMother.random().value;
    return this.create({
      employeeId: id,
      idToDelete: id
    });
  }
}
