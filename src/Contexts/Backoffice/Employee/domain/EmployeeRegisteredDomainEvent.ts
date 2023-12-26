import { DomainEvent } from '../../../Shared/domain/DomainEvent';

export type EmployeeRegisteredDomainEventAttributes = {
  readonly name: string;
  readonly email: string;
};

export class EmployeeRegisteredDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'employee.registered';

  readonly name: string;
  readonly email: string;

  constructor({
    aggregateId,
    name,
    email,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    email: string;
    name: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: EmployeeRegisteredDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    });
    this.email = email;
    this.name = name;
  }

  toPrimitives(): EmployeeRegisteredDomainEventAttributes {
    const { name, email } = this;
    return {
      name,
      email
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: EmployeeRegisteredDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new EmployeeRegisteredDomainEvent({
      aggregateId,
      name: attributes.name,
      email: attributes.email,
      eventId,
      occurredOn
    });
  }
}
