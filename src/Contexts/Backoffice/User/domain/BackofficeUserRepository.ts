import { Criteria } from '../../../Shared/domain/criteria/Criteria';
import { BackofficeUser } from './BackofficeUser';

export interface BackofficeUserRepository {
  save(user: BackofficeUser): Promise<void>;
  searchAll(): Promise<Array<BackofficeUser>>;
  matching(criteria: Criteria): Promise<Array<BackofficeUser>>;
}
