import { Employee } from '../../../domain/Employee';
import { EmployeeId } from '../../../domain/EmployeeId';
import { EmployeeNotFound } from '../../../domain/EmployeeNotFound';
import { EmployeeRepository } from '../../../domain/EmployeeRepository';

export class EmployeeFinder {
  constructor(private repository: EmployeeRepository) {}

  async run(id: string): Promise<Employee> {
    const userId = new EmployeeId(id);
    const user = await this.repository.search(userId);

    if (!user) throw new EmployeeNotFound();

    return user;
  }
}
