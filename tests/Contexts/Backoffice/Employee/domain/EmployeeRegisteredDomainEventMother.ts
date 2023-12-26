import { Employee } from '../../../../../src/Contexts/Backoffice/Employee/domain/Employee';
import { EmployeeRegisteredDomainEvent } from '../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRegisteredDomainEvent';

export class EmployeeRegisteredDomainEventMother {
  static create({
    aggregateId,
    eventId,
    name,
    email,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    email: string;
    name: string;
    occurredOn?: Date;
  }): EmployeeRegisteredDomainEvent {
    return new EmployeeRegisteredDomainEvent({
      aggregateId,
      eventId,
      name,
      email,
      occurredOn
    });
  }

  static fromUser(user: Employee): EmployeeRegisteredDomainEvent {
    return new EmployeeRegisteredDomainEvent({
      aggregateId: user.id.value,
      name: user.name.value,
      email: user.email.value
    });
  }
}
