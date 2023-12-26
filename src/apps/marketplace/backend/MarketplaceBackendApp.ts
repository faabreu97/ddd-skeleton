import marketplaceConfig from '../../../Contexts/Marketplace/Shared/infrastructure/config';
import { EventBus } from '../../../Contexts/Shared/domain/EventBus';
import { DomainEventSubscribers } from '../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMqConnection } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';

import container from './dependency-injection';
import { Server } from './server';

export class MarketplaceBackendApp {
  server?: Server;

  async start() {
    const port = marketplaceConfig.get('port');
    this.server = new Server(port);

    await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    const rabbitMQConnection = container.get<RabbitMqConnection>(
      'Marketplace.Shared.RabbitMQConnection'
    );
    await rabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>(
      'Marketplace.Shared.domain.EventBus'
    );

    const rabbitMQConnection = container.get<RabbitMqConnection>(
      'Marketplace.Shared.RabbitMQConnection'
    );
    await rabbitMQConnection.connect();

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
