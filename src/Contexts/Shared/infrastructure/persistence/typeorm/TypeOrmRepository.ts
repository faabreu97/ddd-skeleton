import { DataSource, EntitySchema, Repository } from 'typeorm';
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { Criteria } from '../../../domain/criteria/Criteria';
import { TypeOrmCriteriaConverter } from './TypeOrmCriteriaConverter';

export abstract class TypeOrmRepository<T extends AggregateRoot> {
  private criteriaConverter: TypeOrmCriteriaConverter<T>;

  constructor(private _client: Promise<DataSource>) {
    this.criteriaConverter = new TypeOrmCriteriaConverter();
  }

  protected abstract entitySchema(): EntitySchema<T>;

  protected client(): Promise<DataSource> {
    return this._client;
  }

  protected async repository(): Promise<Repository<T>> {
    return (await this._client).getRepository(this.entitySchema());
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository();
    await repository.save(aggregateRoot as any);
  }

  protected async searchByCriteria(criteria: Criteria): Promise<T[]> {
    const options = this.criteriaConverter.convert(criteria);

    const repository = await this.repository();
    const values = await repository.find(options);

    return values;
  }
}
