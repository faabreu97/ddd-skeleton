import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { UserResponse } from '../UserResponse';
import { LoginUserFinder } from './LoginUserFinder';
import { LoginUserQuery } from './LoginUserQuery';

export class LoginUserQueryHandler
  implements QueryHandler<LoginUserQuery, UserResponse>
{
  constructor(private finder: LoginUserFinder) {}

  subscribedTo(): Query {
    return LoginUserQuery;
  }

  async handle(query: LoginUserQuery): Promise<UserResponse> {
    const user = await this.finder.run(query.email, query.password);

    return new UserResponse(user);
  }
}
