import { DomainEvent } from '../../../Shared/domain/DomainEvent';

export type UserRegisteredDomainEventAttributes = {
  readonly name: string;
  readonly email: string;
};

export class UserRegisteredDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.registered';

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
      eventName: UserRegisteredDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    });
    this.email = email;
    this.name = name;
  }

  toPrimitives() {
    const { name, email } = this;
    return {
      name,
      email
    };
  }
  static fromPrimitives(params: {
    aggregateId: string;
    attributes: UserRegisteredDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserRegisteredDomainEvent({
      aggregateId,
      name: attributes.name,
      email: attributes.email,
      eventId,
      occurredOn
    });
  }
}
