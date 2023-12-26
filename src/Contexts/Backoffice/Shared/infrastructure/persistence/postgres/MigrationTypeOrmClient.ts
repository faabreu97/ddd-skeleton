import { DataSource } from 'typeorm';
import backofficeConfig from '../../config';

const config = backofficeConfig.get('typeorm');

const dataSource = new DataSource({
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
  migrations: [__dirname + '/migrations/*{.js,.ts}']
});

export default dataSource;
