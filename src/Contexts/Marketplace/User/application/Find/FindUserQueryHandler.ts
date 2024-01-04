import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { UserResponse } from '../UserResponse';
import { FindUserQuery } from './FindUserQuery';
import { UserFinder } from './UserFinder';

export class FindUserQueryHandler
  implements QueryHandler<FindUserQuery, UserResponse>
{
  constructor(private finder: UserFinder) {}

  subscribedTo(): Query {
    return FindUserQuery;
  }

  async handle(query: FindUserQuery): Promise<UserResponse> {
    const user = await this.finder.run(query.id);

    return new UserResponse(user);
  }
}
