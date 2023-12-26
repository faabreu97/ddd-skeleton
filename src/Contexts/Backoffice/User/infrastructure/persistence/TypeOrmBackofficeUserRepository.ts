import { EntitySchema } from 'typeorm';
import { Criteria } from '../../../../Shared/domain/criteria/Criteria';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { BackofficeUser } from '../../domain/BackofficeUser';
import { BackofficeUserRepository } from '../../domain/BackofficeUserRepository';
import { BackofficeUserEntity } from './typeorm/BackofficeUserEntity';

export class TypeOrmBackofficeUserRepository
  extends TypeOrmRepository<BackofficeUser>
  implements BackofficeUserRepository
{
  async matching(criteria: Criteria): Promise<BackofficeUser[]> {
    const users = await this.searchByCriteria(criteria);
    return users;
  }

  async searchAll(): Promise<BackofficeUser[]> {
    const repository = await this.repository();

    const users = await repository.find({});

    return users;
  }

  save(user: BackofficeUser): Promise<void> {
    return this.persist(user);
  }

  protected entitySchema(): EntitySchema<BackofficeUser> {
    return BackofficeUserEntity;
  }
}
