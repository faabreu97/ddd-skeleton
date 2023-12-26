import { EmployeeId } from '../../../domain/EmployeeId';
import { EmployeeRepository } from '../../../domain/EmployeeRepository';

export class EmployeesFinder {
  constructor(private repository: EmployeeRepository) {}

  run(id: string) {
    return this.repository.searchAll(new EmployeeId(id));
  }
}
