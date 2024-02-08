import { EmployeeId } from '../../../domain/EmployeeId';
import { EmployeeRepository } from '../../../domain/EmployeeRepository';
import { EmployeeRoles } from '../../../domain/EmployeeRole';
import { EmployeeRoleEnsurer } from '../../../domain/EmployeeRoleEnsurer';

export class EmployeesFinder {
  private readonly ensurer: EmployeeRoleEnsurer;

  constructor(private repository: EmployeeRepository) {
    this.ensurer = new EmployeeRoleEnsurer(repository);
  }

  async run(id: string) {
    await this.ensurer.run(id, [EmployeeRoles.owner]);
    return this.repository.searchAll(new EmployeeId(id));
  }
}
