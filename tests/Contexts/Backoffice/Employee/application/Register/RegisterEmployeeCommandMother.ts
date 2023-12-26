import { EmployeeRoles } from '../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRole';
import { RegisterEmployeeCommand } from '../../../../../../src/Contexts/Backoffice/Employee/domain/RegisterEmployeeCommand';
import { Primitives } from '../../../../../../src/Contexts/Shared/domain/Primitives';
import { EmailAddressMother } from '../../../../Shared/domain/EmailAddressMother';
import { PasswordMother } from '../../../../Shared/domain/PasswordMother';
import { EmployeeIdMother } from '../../domain/EmployeeIdMother';
import { EmployeeNameMother } from '../../domain/EmployeeNameMother';
import { EmployeeRoleMother } from '../../domain/EmployeeRoleMother';

export class RegisterEmployeeCommandMother {
  static create(
    value: Primitives<RegisterEmployeeCommand>
  ): RegisterEmployeeCommand {
    return new RegisterEmployeeCommand(value);
  }

  static random(
    data?: Partial<RegisterEmployeeCommand>
  ): RegisterEmployeeCommand {
    return this.create({
      id: data?.id ?? EmployeeIdMother.random().value,
      name: data?.name ?? EmployeeNameMother.random().value,
      email: data?.email ?? EmailAddressMother.random().value,
      password: data?.password ?? PasswordMother.random(),
      role: data?.role ?? EmployeeRoleMother.create(EmployeeRoles.owner).value
    });
  }
}
