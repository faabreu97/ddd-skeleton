import { UserRegisteredDomainEvent } from '../../../../Marketplace/User/domain/UserRegisteredDomainEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { BackofficeUserCreator } from './BackofficeUserCreator';

export class CreateBackofficeUserOnUserRegistered
  implements DomainEventSubscriber<UserRegisteredDomainEvent>
{
  constructor(private creator: BackofficeUserCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [UserRegisteredDomainEvent];
  }

  on(domainEvent: UserRegisteredDomainEvent): Promise<void> {
    const { aggregateId, email, name } = domainEvent;

    return this.creator.run(aggregateId, email, name);
  }
}
