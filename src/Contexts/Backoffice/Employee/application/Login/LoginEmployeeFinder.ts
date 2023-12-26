import { EmailAddress } from '../../../../Shared/domain/value-object/EmailAddress';
import { EmployeeNotFound } from '../../domain/EmployeeNotFound';
import { EmployeePasswordDoNotMatch } from '../../domain/EmployeePasswordDoNotMatch';
import { EmployeeRepository } from '../../domain/EmployeeRepository';

export class LoginEmployeeFinder {
  constructor(private repository: EmployeeRepository) {}

  async run(email: string, password: string) {
    const user = await this.repository.searchByEmail(new EmailAddress(email));
    if (!user) throw new EmployeeNotFound('Credentials incorrect');

    const passMath = await user.passwordMatch(password);
    if (!passMath)
      throw new EmployeePasswordDoNotMatch('Credentials incorrect');

    return user;
  }
}
