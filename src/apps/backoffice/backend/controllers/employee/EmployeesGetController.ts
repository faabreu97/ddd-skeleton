import { Response } from 'express';
import httpStatus from 'http-status';
import { EmployeeResponse } from '../../../../../Contexts/Backoffice/Employee/application/EmployeeResponse';
import { FindEmployeesQuery } from '../../../../../Contexts/Backoffice/Employee/application/Find/FindEmployees/FindEmployeesQuery';
import { EmployeeActionNotAllowed } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeeActionNotAllowed';
import { EmployeeNotFound } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeeNotFound';
import { QueryBus } from '../../../../../Contexts/Shared/domain/QueryBus';
import { UserRequest } from '../../routes';
import { Controller } from '../Controller';

export default class EmployeesGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: UserRequest, res: Response) {
    try {
      const id = req.user?.id;
      const query = new FindEmployeesQuery(id);
      const users = await this.queryBus.ask<EmployeeResponse[]>(query);

      res.status(httpStatus.OK).send(users);
    } catch (error) {
      if (error instanceof EmployeeActionNotAllowed) {
        res.status(httpStatus.FORBIDDEN).send({ message: error.message });
        return;
      }
      if (error instanceof EmployeeNotFound) {
        res.status(httpStatus.NOT_FOUND).send({ message: error.message });
        return;
      }

      throw error;
    }
  }
}
