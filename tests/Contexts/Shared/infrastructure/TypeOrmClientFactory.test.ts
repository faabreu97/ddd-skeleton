import { DataSource } from 'typeorm';
import { TypeOrmClientFactory } from '../../../../src/Contexts/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory';

describe('TypeOrmClientFactory', () => {
  const factory = TypeOrmClientFactory;
  let client: DataSource;

  beforeEach(async () => {
    client = await factory.createClient('test', {
      host: 'localhost',
      port: 5455,
      username: 'fandf',
      password: 'fandf',
      database: 'backoffice-backend-dev'
    });
  });

  afterEach(async () => {
    await client.destroy();
  });

  it('creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(DataSource);
    expect(client.isInitialized).toBe(true);
  });

  it('returns a client if it already exists', async () => {
    const newClient = await factory.createClient('test', {
      host: 'localhost',
      port: 5455,
      username: 'fandf',
      password: 'fandf',
      database: 'backoffice-backend-dev'
    });

    expect(newClient).toBe(client);
    expect(newClient.isInitialized).toBeTruthy();
  });
});
