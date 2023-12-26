import { Response } from 'express';
import httpStatus from 'http-status';
import { EmployeeResponse } from '../../../../../Contexts/Backoffice/Employee/application/EmployeeResponse';
import { FindEmployeeQuery } from '../../../../../Contexts/Backoffice/Employee/application/Find/FindEmployee/FindEmployeeQuery';
import { EmployeeNotFound } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeeNotFound';
import { QueryBus } from '../../../../../Contexts/Shared/domain/QueryBus';
import { UserRequest } from '../../routes';
import { Controller } from '../Controller';

export default class ProfileGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: UserRequest, res: Response) {
    try {
      const id = req.user?.id;
      const query = new FindEmployeeQuery(id);
      const user = await this.queryBus.ask<EmployeeResponse>(query);

      res.status(httpStatus.OK).send(user);
    } catch (error) {
      if (error instanceof EmployeeNotFound) {
        res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });
        return;
      }

      throw error;
    }
  }
}
