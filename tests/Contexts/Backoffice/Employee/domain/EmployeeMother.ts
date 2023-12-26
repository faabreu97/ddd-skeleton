import { Employee } from '../../../../../src/Contexts/Backoffice/Employee/domain/Employee';
import { EmployeeRoles } from '../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRole';
import { RegisterEmployeeCommand } from '../../../../../src/Contexts/Backoffice/Employee/domain/RegisterEmployeeCommand';
import { EmailAddressMother } from '../../../Shared/domain/EmailAddressMother';
import { PasswordMother } from '../../../Shared/domain/PasswordMother';
import { EmployeeIdMother } from './EmployeeIdMother';
import { EmployeeNameMother } from './EmployeeNameMother';
import { EmployeeRoleMother } from './EmployeeRoleMother';

export class EmployeeMother {
  static create(plainData?: {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: EmployeeRoles;
  }): Promise<Employee> {
    return Employee.create({
      id: plainData?.id ?? EmployeeIdMother.random().value,
      name: plainData?.name ?? EmployeeNameMother.random().value,
      email: plainData?.email ?? EmailAddressMother.random().value,
      password: plainData?.password ?? PasswordMother.random(),
      role: plainData?.role ?? EmployeeRoles.owner
    });
  }

  static async from(command: RegisterEmployeeCommand): Promise<Employee> {
    const employeePass = await PasswordMother.create(command.password);
    return new Employee(
      EmployeeIdMother.create(command.id),
      EmployeeNameMother.create(command.name),
      EmailAddressMother.create(command.email),
      employeePass,
      EmployeeRoleMother.create(EmployeeRoles.owner)
    );
  }

  static async random(): Promise<Employee> {
    const employeePass = await PasswordMother.create();
    return new Employee(
      EmployeeIdMother.random(),
      EmployeeNameMother.random(),
      EmailAddressMother.random(),
      employeePass,
      EmployeeRoleMother.random()
    );
  }
}
