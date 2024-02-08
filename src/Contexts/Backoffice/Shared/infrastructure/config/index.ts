import convict from 'convict';

const backofficeConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The application port.',
    format: String,
    default: '4000',
    env: 'PORT'
  },
  typeorm: {
    host: {
      doc: 'The database host',
      format: String,
      env: 'TYPEORM_HOST',
      default: 'localhost'
    },
    port: {
      doc: 'The database port',
      format: Number,
      env: 'TYPEORM_PORT',
      default: 5432
    },
    username: {
      doc: 'The database username',
      format: String,
      env: 'TYPEORM_USERNAME',
      default: 'fandf'
    },
    password: {
      doc: 'The database password',
      format: String,
      env: 'TYPEORM_PASSWORD',
      default: 'fandf'
    },
    database: {
      doc: 'The database name',
      format: String,
      env: 'TYPEORM_DATABASE',
      default: 'backoffice-backend-dev'
    }
  },
  rabbitmq: {
    connectionSettings: {
      username: {
        doc: 'RabbitMQ username',
        format: String,
        env: 'RABBITMQ_USERNAME',
        default: 'guest'
      },
      password: {
        doc: 'RabbitMQ password',
        format: String,
        env: 'RABBITMQ_PASSWORD',
        default: 'guest'
      },
      vhost: {
        doc: 'RabbitMQ virtual host',
        format: String,
        env: 'RABBITMQ_VHOST',
        default: '/'
      },
      connection: {
        secure: {
          doc: 'RabbitMQ secure protocol',
          format: Boolean,
          env: 'RABBITMQ_SECURE',
          default: false
        },
        hostname: {
          doc: 'RabbitMQ hostname',
          format: String,
          env: 'RABBITMQ_HOSTNAME',
          default: 'localhost'
        },
        port: {
          doc: 'RabbitMQ amqp port',
          format: Number,
          env: 'RABBITMQ_PORT',
          default: 5672
        }
      }
    },
    exchangeSettings: {
      name: {
        doc: 'RabbitMQ exchange name',
        format: String,
        env: 'RABBITMQ_EXCHANGE_NAME',
        default: 'domain_events'
      }
    },
    maxRetries: {
      doc: 'Max number of retries for each message',
      format: Number,
      env: 'RABBITMQ_MAX_RETRIES',
      default: 3
    },
    retryTtl: {
      doc: 'Ttl for messages in the retry queue',
      format: Number,
      env: 'RABBITMQ_RETRY_TTL',
      default: 1000
    }
  },
  secret: {
    jwt: {
      doc: 'The JWT Secret',
      format: String,
      env: 'JWT_SECRET',
      default:
        '668a202b18365093819161f8bdfd992edab1f5833096504406513da82385796476780a105434a5a811e05fe1e9138cb3d70753c221a4c2fbb47094b8f6380ecd'
    },
    crypto: {
      doc: 'The Crypto Secret',
      format: String,
      env: 'CRYPTO_SECRET',
      default:
        '218f8a3cade9969d27d19f17fc6709ec63c4de02970348f5551dae37d1975f1e3c7cef5bffdfe0a755e49a053bfba0c09da2d2ccd6ccc8d40be6f6446be948d1'
    }
  }
});

backofficeConfig.loadFile([
  __dirname + '/default.json',
  __dirname + '/' + backofficeConfig.get('env') + '.json'
]);

export default backofficeConfig;
