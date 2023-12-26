import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { EmailAddress } from '../../../Shared/domain/value-object/EmailAddress';
import { Password } from '../../../Shared/domain/value-object/Password';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { EmployeeId } from './EmployeeId';
import { EmployeeName } from './EmployeeName';
import { EmployeeRegisteredDomainEvent } from './EmployeeRegisteredDomainEvent';
import { EmployeeRole, EmployeeRoles } from './EmployeeRole';

export class Employee extends AggregateRoot {
  readonly id: EmployeeId;
  readonly name: EmployeeName;
  readonly email: EmailAddress;
  password: Password;
  readonly role: EmployeeRole;

  constructor(
    id: EmployeeId,
    name: EmployeeName,
    email: EmailAddress,
    password: Password,
    role: EmployeeRole
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static async create(plainData: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    const password = await Password.create(plainData.password);
    const user = new Employee(
      new EmployeeId(plainData.id || Uuid.random().value),
      new EmployeeName(plainData.name),
      new EmailAddress(plainData.email),
      password,
      new EmployeeRole(plainData.role as EmployeeRoles)
    );

    user.record(
      new EmployeeRegisteredDomainEvent({
        aggregateId: user.id.value,
        name: user.name.value,
        email: user.email.value
      })
    );

    return user;
  }

  public passwordMatch(value: string) {
    return this.password.compareValue(value);
  }

  public async changePassword(value: string) {
    this.password = await Password.create(value);
  }

  public isOwner() {
    return this.role.value === EmployeeRoles.owner;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value.toString()
    };
  }
}
