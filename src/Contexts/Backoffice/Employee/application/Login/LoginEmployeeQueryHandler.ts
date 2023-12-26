import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { EmployeeResponse } from '../EmployeeResponse';
import { LoginEmployeeFinder } from './LoginEmployeeFinder';
import { LoginEmployeeQuery } from './LoginEmployeeQuery';

export class LoginEmployeeQueryHandler
  implements QueryHandler<LoginEmployeeQuery, EmployeeResponse>
{
  constructor(private finder: LoginEmployeeFinder) {}

  subscribedTo(): Query {
    return LoginEmployeeQuery;
  }

  async handle(query: LoginEmployeeQuery): Promise<EmployeeResponse> {
    const user = await this.finder.run(query.email, query.password);

    return new EmployeeResponse(user);
  }
}
