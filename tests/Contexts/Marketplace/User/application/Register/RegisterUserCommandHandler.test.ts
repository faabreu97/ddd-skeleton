import { RegisterUserCommandHandler } from '../../../../../../src/Contexts/Marketplace/User/application/Register/RegisterUserCommandHandler';
import { UserRegistrar } from '../../../../../../src/Contexts/Marketplace/User/application/Register/UserRegistrar';
import EventBusMock from '../../../../Shared/infrastructure/EventBus/__mocks__/EventBusMock';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { UserMother } from '../../domain/UserMother';
import { UserRegisteredDomainEventMother } from '../../domain/UserRegisteredDomainEventMother';
import { RegisterUserCommandMother } from './RegisterUserCommandMother';

let repository: UserRepositoryMock;
let creator: UserRegistrar;
let eventBus: EventBusMock;
let handler: RegisterUserCommandHandler;

beforeEach(() => {
  repository = new UserRepositoryMock();
  eventBus = new EventBusMock();
  creator = new UserRegistrar(repository, eventBus);
  handler = new RegisterUserCommandHandler(creator);
});

describe('RegisterUserCommandHandler', () => {
  it('should register a valid user', async () => {
    const command = RegisterUserCommandMother.random();
    const user = await UserMother.from(command);
    const domainEvent = UserRegisteredDomainEventMother.fromUser(user);

    await handler.handle(command);

    repository.assertSave();
    eventBus.assertLastPublishedEventIs(domainEvent);
  });
});
