import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BackofficeUsersResponse } from '../../../../../Contexts/Backoffice/User/application/SearchAll/BackofficeUsersResponse';
import { SearchAllBackofficeUsersQuery } from '../../../../../Contexts/Backoffice/User/application/SearchAll/SearchAllBackofficeUsersQuery';
import { QueryBus } from '../../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from '../Controller';

export default class BackofficeUsersGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, res: Response) {
    const query = new SearchAllBackofficeUsersQuery();
    const response = await this.queryBus.ask<BackofficeUsersResponse>(query);

    res.status(httpStatus.OK).send(response.users);
  }
}
