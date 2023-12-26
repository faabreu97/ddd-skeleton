import { EmployeeId } from '../../../domain/EmployeeId';
import { EmployeeNotFound } from '../../../domain/EmployeeNotFound';
import { EmployeePasswordDoNotMatch } from '../../../domain/EmployeePasswordDoNotMatch';
import { EmployeeRepository } from '../../../domain/EmployeeRepository';

export class EmployeePasswordEditor {
  constructor(private repository: EmployeeRepository) {}

  async run(params: {
    id: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> {
    const { id, oldPassword, newPassword, confirmPassword } = params;

    if (newPassword !== confirmPassword) throw new EmployeePasswordDoNotMatch();

    const user = await this.repository.search(new EmployeeId(id));
    if (!user) throw new EmployeeNotFound();

    const passwordMatch = await user.passwordMatch(oldPassword);
    if (!passwordMatch) throw new EmployeePasswordDoNotMatch();

    user.changePassword(newPassword);

    await this.repository.save(user);
  }
}
