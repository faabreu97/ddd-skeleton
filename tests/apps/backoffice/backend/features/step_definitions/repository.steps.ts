import { Given } from '@cucumber/cucumber';

import { Employee } from '../../../../../../src/Contexts/Backoffice/Employee/domain/Employee';
import { EmployeeId } from '../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeId';
import { EmployeeName } from '../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeName';
import { EmployeeRepository } from '../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRepository';
import {
  EmployeeRole,
  EmployeeRoles
} from '../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRole';
import { EmailAddress } from '../../../../../../src/Contexts/Shared/domain/value-object/EmailAddress';
import { Password } from '../../../../../../src/Contexts/Shared/domain/value-object/Password';
import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';

const employeeRepository: EmployeeRepository = container.get(
  'Backoffice.Employee.domain.EmployeeRepository'
);

Given('there is the employee:', async (employee: any) => {
  const { id, name, email, password, role } = JSON.parse(employee);
  const employeePass = await Password.create(password);
  await employeeRepository.save(
    new Employee(
      new EmployeeId(id),
      new EmployeeName(name),
      new EmailAddress(email),
      employeePass,
      new EmployeeRole(role ?? EmployeeRoles.owner)
    )
  );
});
