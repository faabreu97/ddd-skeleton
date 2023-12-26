import { Nullable } from '../../../Shared/domain/Nullable';
import { Criteria } from '../../../Shared/domain/criteria/Criteria';
import { EmailAddress } from '../../../Shared/domain/value-object/EmailAddress';
import { User } from './User';
import { UserId } from './UserId';

export interface UserRepository {
  save(user: User): Promise<void>;
  search(userId: UserId): Promise<Nullable<User>>;
  searchByEmail(email: EmailAddress): Promise<Nullable<User>>;
  matching(criteria: Criteria): Promise<Array<User>>;
}
