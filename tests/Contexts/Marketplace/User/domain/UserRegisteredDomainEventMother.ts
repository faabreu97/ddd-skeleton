import { User } from '../../../../../src/Contexts/Marketplace/User/domain/User';
import { UserRegisteredDomainEvent } from '../../../../../src/Contexts/Marketplace/User/domain/UserRegisteredDomainEvent';

export class UserRegisteredDomainEventMother {
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
  }): UserRegisteredDomainEvent {
    return new UserRegisteredDomainEvent({
      aggregateId,
      eventId,
      name,
      email,
      occurredOn
    });
  }

  static fromUser(user: User): UserRegisteredDomainEvent {
    return new UserRegisteredDomainEvent({
      aggregateId: user.id.value,
      name: user.name.value,
      email: user.email.value
    });
  }
}
