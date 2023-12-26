import { ForbiddenError } from '../../../../Shared/domain/ForbiddenError';
import { EmployeeId } from '../../domain/EmployeeId';
import { EmployeeNotFound } from '../../domain/EmployeeNotFound';
import { EmployeeRepository } from '../../domain/EmployeeRepository';

export class EmployeeRemover {
  constructor(private repository: EmployeeRepository) {}

  async run(params: { employeeId: string; idToDelete: string }): Promise<void> {
    if (params.employeeId === params.idToDelete)
      throw new ForbiddenError('You can not delete your own account');

    const user = await this.repository.search(
      new EmployeeId(params.employeeId)
    );
    if (!user) throw new EmployeeNotFound('User does not exist');
    if (!user.isOwner())
      throw new ForbiddenError('Only owners can delete users');

    const userToDelete = await this.repository.search(
      new EmployeeId(params.idToDelete)
    );
    if (!userToDelete) throw new EmployeeNotFound('User does not exist');

    await this.repository.remove(userToDelete.id);
  }
}
