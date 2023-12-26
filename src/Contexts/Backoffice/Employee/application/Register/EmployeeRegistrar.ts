import { EventBus } from '../../../../Shared/domain/EventBus';
import { EmailAddress } from '../../../../Shared/domain/value-object/EmailAddress';
import { Employee } from '../../domain/Employee';
import { EmployeeAlreadyExist } from '../../domain/EmployeeAlreadyExist';
import { EmployeeId } from '../../domain/EmployeeId';
import { EmployeeIdAlreadyExist } from '../../domain/EmployeeIdAlreadyExist';
import { EmployeeRepository } from '../../domain/EmployeeRepository';

export class EmployeeRegistrar {
  constructor(
    private repository: EmployeeRepository,
    private eventBus: EventBus
  ) {}

  async run(params: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<void> {
    let userExist = await this.repository.search(new EmployeeId(params.id));
    if (userExist)
      throw new EmployeeIdAlreadyExist(
        `There is already a user with id <${params.id}>`
      );
    userExist = await this.repository.searchByEmail(
      new EmailAddress(params.email)
    );
    if (userExist) throw new EmployeeAlreadyExist('Email already exist');

    const user = await Employee.create(params);

    await this.repository.save(user);

    await this.eventBus.publish(user.pullDomainEvents());
  }
}
