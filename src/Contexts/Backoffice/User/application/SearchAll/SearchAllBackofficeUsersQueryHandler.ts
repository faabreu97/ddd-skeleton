import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { BackofficeUsersFinder } from './BackofficeUsersFinder';
import { BackofficeUsersResponse } from './BackofficeUsersResponse';
import { SearchAllBackofficeUsersQuery } from './SearchAllBackofficeUsersQuery';

export class SearchAllBackofficeUsersQueryHandler
  implements
    QueryHandler<SearchAllBackofficeUsersQuery, BackofficeUsersResponse>
{
  constructor(private finder: BackofficeUsersFinder) {}

  subscribedTo(): Query {
    return SearchAllBackofficeUsersQuery;
  }

  async handle(
    _query: SearchAllBackofficeUsersQuery
  ): Promise<BackofficeUsersResponse> {
    const users = await this.finder.run();

    return new BackofficeUsersResponse(users);
  }
}
