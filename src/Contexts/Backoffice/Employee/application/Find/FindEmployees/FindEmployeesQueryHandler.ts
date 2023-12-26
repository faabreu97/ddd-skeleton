import { Query } from '../../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../../Shared/domain/QueryHandler';
import { EmployeeResponse } from '../../EmployeeResponse';
import { EmployeesFinder } from './EmployeesFinder';
import { FindEmployeesQuery } from './FindEmployeesQuery';

export class FindEmployeesQueryHandler
  implements QueryHandler<FindEmployeesQuery, EmployeeResponse[]>
{
  constructor(private finder: EmployeesFinder) {}

  subscribedTo(): Query {
    return FindEmployeesQuery;
  }

  async handle(query: FindEmployeesQuery): Promise<EmployeeResponse[]> {
    const users = await this.finder.run(query.id);

    return users.map(user => new EmployeeResponse(user));
  }
}
