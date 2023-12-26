import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/EventBus';
import { MarketplaceBackendApp } from '../../../../../../src/apps/marketplace/backend/MarketplaceBackendApp';
import { ConfigureRabbitMQCommand } from '../../../../../../src/apps/marketplace/backend/command/ConfigureRabbitMQCommand';
import container from '../../../../../../src/apps/marketplace/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

let application: MarketplaceBackendApp;
let environmentArranger: EnvironmentArranger;
let eventBus: EventBus;

BeforeAll(async () => {
  await ConfigureRabbitMQCommand.run();

  environmentArranger = await container.get<Promise<EnvironmentArranger>>(
    'Marketplace.EnvironmentArranger'
  );
  eventBus = container.get<EventBus>('Marketplace.Shared.domain.EventBus');
  await environmentArranger.arrange();

  application = new MarketplaceBackendApp();
  await application.start();
});

AfterAll(async () => {
  await environmentArranger.arrange();
  await environmentArranger.close();

  await application.stop();
});

export { application, environmentArranger, eventBus };
