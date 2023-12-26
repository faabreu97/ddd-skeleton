import { Query } from '../../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../../Shared/domain/QueryHandler';
import { EmployeeResponse } from '../../EmployeeResponse';
import { EmployeeFinder } from './EmployeeFinder';
import { FindEmployeeQuery } from './FindEmployeeQuery';

export class FindEmployeeQueryHandler
  implements QueryHandler<FindEmployeeQuery, EmployeeResponse>
{
  constructor(private finder: EmployeeFinder) {}

  subscribedTo(): Query {
    return FindEmployeeQuery;
  }

  async handle(query: FindEmployeeQuery): Promise<EmployeeResponse> {
    const user = await this.finder.run(query.id);

    return new EmployeeResponse(user);
  }
}
