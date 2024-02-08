import { EmployeeRegistrar } from '../../../../../../src/Contexts/Backoffice/Employee/application/Register/EmployeeRegistrar';
import { RegisterEmployeeCommandHandler } from '../../../../../../src/Contexts/Backoffice/Employee/application/Register/RegisterEmployeeCommandHandler';
import EventBusMock from '../../../../Shared/infrastructure/EventBus/__mocks__/EventBusMock';
import { EmployeeRepositoryMock } from '../../__mocks__/EmployeeRepositoryMock';
import { EmployeeMother } from '../../domain/EmployeeMother';
import { EmployeeRegisteredDomainEventMother } from '../../domain/EmployeeRegisteredDomainEventMother';
import { RegisterEmployeeCommandMother } from './RegisterEmployeeCommandMother';

let repository: EmployeeRepositoryMock;
let creator: EmployeeRegistrar;
let eventBus: EventBusMock;
let handler: RegisterEmployeeCommandHandler;

beforeEach(() => {
  repository = new EmployeeRepositoryMock();
  eventBus = new EventBusMock();
  creator = new EmployeeRegistrar(repository, eventBus);
  handler = new RegisterEmployeeCommandHandler(creator);
});

describe('RegisterUserCommandHandler', () => {
  it('should register a valid user', async () => {
    const command = RegisterEmployeeCommandMother.random();
    const user = await EmployeeMother.from(command);
    const domainEvent = EmployeeRegisteredDomainEventMother.fromUser(user);
    repository.returnOnSearch(user);

    await handler.handle(command);

    repository.assertSave();
    eventBus.assertLastPublishedEventIs(domainEvent);
  });
});
