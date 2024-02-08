import { ForbiddenError } from '../../../../Shared/domain/ForbiddenError';
import { EmployeeId } from '../../domain/EmployeeId';
import { EmployeeNotFound } from '../../domain/EmployeeNotFound';
import { EmployeeRepository } from '../../domain/EmployeeRepository';
import { EmployeeRoles } from '../../domain/EmployeeRole';
import { EmployeeRoleEnsurer } from '../../domain/EmployeeRoleEnsurer';

export class EmployeeRemover {
  private readonly ensurer: EmployeeRoleEnsurer;

  constructor(private repository: EmployeeRepository) {
    this.ensurer = new EmployeeRoleEnsurer(repository);
  }

  async run(params: { employeeId: string; idToDelete: string }): Promise<void> {
    if (params.employeeId === params.idToDelete)
      throw new ForbiddenError('You can not delete your own account');

    await this.ensurer.run(params.employeeId, [EmployeeRoles.owner]);

    const user = await this.repository.search(
      new EmployeeId(params.idToDelete)
    );
    if (!user) throw new EmployeeNotFound('User does not exist');

    await this.repository.remove(user.id);
  }
}
