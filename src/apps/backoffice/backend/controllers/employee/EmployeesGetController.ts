import { Response } from 'express';
import httpStatus from 'http-status';
import { EmployeeResponse } from '../../../../../Contexts/Backoffice/Employee/application/EmployeeResponse';
import { FindEmployeesQuery } from '../../../../../Contexts/Backoffice/Employee/application/Find/FindEmployees/FindEmployeesQuery';
import { QueryBus } from '../../../../../Contexts/Shared/domain/QueryBus';
import { UserRequest } from '../../routes';
import { Controller } from '../Controller';

export default class EmployeesGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: UserRequest, res: Response) {
    const id = req.user?.id;
    const query = new FindEmployeesQuery(id);
    const users = await this.queryBus.ask<EmployeeResponse[]>(query);

    res.status(httpStatus.OK).send(users);
  }
}
