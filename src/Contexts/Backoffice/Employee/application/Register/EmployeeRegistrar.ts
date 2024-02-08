import { EventBus } from '../../../../Shared/domain/EventBus';
import { EmailAddress } from '../../../../Shared/domain/value-object/EmailAddress';
import { Employee } from '../../domain/Employee';
import { EmployeeAlreadyExist } from '../../domain/EmployeeAlreadyExist';
import { EmployeeId } from '../../domain/EmployeeId';
import { EmployeeIdAlreadyExist } from '../../domain/EmployeeIdAlreadyExist';
import { EmployeeRepository } from '../../domain/EmployeeRepository';
import { EmployeeRoles } from '../../domain/EmployeeRole';
import { EmployeeRoleEnsurer } from '../../domain/EmployeeRoleEnsurer';

export class EmployeeRegistrar {
  private readonly ensurer: EmployeeRoleEnsurer;

  constructor(
    private repository: EmployeeRepository,
    private eventBus: EventBus
  ) {
    this.ensurer = new EmployeeRoleEnsurer(repository);
  }

  async run(params: {
    employeeId: string;
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<void> {
    await this.ensurer.run(params.employeeId, [EmployeeRoles.owner]);

    let employeeExist = await this.repository.search(new EmployeeId(params.id));
    if (employeeExist)
      throw new EmployeeIdAlreadyExist(
        `There is already a user with id <${params.id}>`
      );
    employeeExist = await this.repository.searchByEmail(
      new EmailAddress(params.email)
    );
    if (employeeExist) throw new EmployeeAlreadyExist('Email already exist');

    const user = await Employee.create(params);
    await this.repository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  }
}
