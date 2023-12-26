import { DataSource } from 'typeorm';
import { Nullable } from '../../../domain/Nullable';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmClientFactory {
  private static clients: { [key: string]: DataSource } = {};

  private static async getClient(
    contextName: string
  ): Promise<Nullable<DataSource>> {
    let client = TypeOrmClientFactory.clients[contextName];
    if (!client) return null;
    if (!client.isInitialized) {
      await client.initialize();
    }
    return client;
  }

  private static registerClient(client: DataSource, contextName: string): void {
    TypeOrmClientFactory.clients[contextName] = client;
  }

  private static async createAndConnectClient(
    config: TypeOrmConfig
  ): Promise<DataSource> {
    let client = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [
        __dirname +
          '/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}'
      ],
      // migrations: [
      //   'src/Contexts/Backoffice/Shared/infrastructure/persistence/postgres/migrations/*.ts'
      // ],
      synchronize: process.env.NODE_ENV === 'test',
      logging: false
    });

    client = await client.initialize();

    return client;
  }

  static async createClient(
    contextName: string,
    config: TypeOrmConfig
  ): Promise<DataSource> {
    let client = await TypeOrmClientFactory.getClient(contextName);

    if (!client) {
      client = await TypeOrmClientFactory.createAndConnectClient(config);

      TypeOrmClientFactory.registerClient(client, contextName);
    }

    return client;
  }
}
