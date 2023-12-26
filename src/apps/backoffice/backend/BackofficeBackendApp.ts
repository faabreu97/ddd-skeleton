import { Employee } from '../../../Contexts/Backoffice/Employee/domain/Employee';
import { EmployeeId } from '../../../Contexts/Backoffice/Employee/domain/EmployeeId';
import { EmployeeName } from '../../../Contexts/Backoffice/Employee/domain/EmployeeName';
import { EmployeeRepository } from '../../../Contexts/Backoffice/Employee/domain/EmployeeRepository';
import {
  EmployeeRole,
  EmployeeRoles
} from '../../../Contexts/Backoffice/Employee/domain/EmployeeRole';
import backofficeConfig from '../../../Contexts/Backoffice/Shared/infrastructure/config';
import { EventBus } from '../../../Contexts/Shared/domain/EventBus';
import { EmailAddress } from '../../../Contexts/Shared/domain/value-object/EmailAddress';
import { Password } from '../../../Contexts/Shared/domain/value-object/Password';
import { DomainEventSubscribers } from '../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMqConnection } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';

import container from './dependency-injection';
import { Server } from './server';

export class BackofficeBackendApp {
  server?: Server;

  async start() {
    const port = backofficeConfig.get('port');
    this.server = new Server(port);

    await this.configureEventBus();
    this.configureMasterUser();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    const rabbitMQConnection = container.get<RabbitMqConnection>(
      'Backoffice.Shared.RabbitMQConnection'
    );
    await rabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>(
      'Backoffice.Shared.domain.EventBus'
    );

    const rabbitMQConnection = container.get<RabbitMqConnection>(
      'Backoffice.Shared.RabbitMQConnection'
    );
    await rabbitMQConnection.connect();

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }

  private async configureMasterUser() {
    const userRepository = container.get<EmployeeRepository>(
      'Backoffice.Employee.domain.EmployeeRepository'
    );

    const password = await Password.create('fandfMaster@');
    const user = new Employee(
      new EmployeeId('ef8ac118-8d7f-49cc-abec-78e0d05afa80'),
      new EmployeeName('F&F Technologies'),
      new EmailAddress('fftechnology.llc@gmail.com'),
      password,
      new EmployeeRole(EmployeeRoles.owner)
    );

    const userExist = await userRepository.search(user.id);
    if (!userExist) {
      userRepository.save(user);
    }
  }
}
