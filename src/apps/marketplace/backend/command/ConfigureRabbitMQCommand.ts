import { RabbitMQConfig } from '../../../../Contexts/Marketplace/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory';
import { DomainEventSubscribers } from '../../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMQConfigurer } from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer';
import { RabbitMqConnection } from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQqueueFormatter } from '../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import container from '../dependency-injection';

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>(
      'Marketplace.Shared.RabbitMQConnection'
    );
    const nameFormatter = container.get<RabbitMQqueueFormatter>(
      'Marketplace.Shared.RabbitMQQueueFormatter'
    );
    const { exchangeSettings, retryTtl } = container.get<RabbitMQConfig>(
      'Marketplace.Shared.RabbitMQConfig'
    );

    await connection.connect();

    const configurer = new RabbitMQConfigurer(
      connection,
      nameFormatter,
      retryTtl
    );
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({
      exchange: exchangeSettings.name,
      subscribers
    });
    await connection.close();
  }
}
