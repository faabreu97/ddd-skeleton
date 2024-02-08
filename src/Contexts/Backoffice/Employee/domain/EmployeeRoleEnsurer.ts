import { EmployeeActionNotAllowed } from './EmployeeActionNotAllowed';
import { EmployeeId } from './EmployeeId';
import { EmployeeNotFound } from './EmployeeNotFound';
import { EmployeeRepository } from './EmployeeRepository';
import { EmployeeRole } from './EmployeeRole';

export class EmployeeRoleEnsurer {
  constructor(private repository: EmployeeRepository) {}

  async run(employeeId: string, roles: string[]): Promise<void> {
    const employee = await this.repository.search(new EmployeeId(employeeId));
    if (!employee) throw new EmployeeNotFound('Employee not found');
    const mappedRoles = roles.map(item => new EmployeeRole(item));
    const employeeHasRole = employee.hasRole(mappedRoles);
    if (!employeeHasRole)
      throw new EmployeeActionNotAllowed(
        'Unable to perform action. Access denied'
      );
  }
}
