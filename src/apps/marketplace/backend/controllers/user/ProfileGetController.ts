import { Response } from 'express';
import httpStatus from 'http-status';
import { FindUserQuery } from '../../../../../Contexts/Marketplace/User/application/Find/FindUserQuery';
import { UserResponse } from '../../../../../Contexts/Marketplace/User/application/UserResponse';
import { UserNotFound } from '../../../../../Contexts/Marketplace/User/domain/UserNotFound';
import { QueryBus } from '../../../../../Contexts/Shared/domain/QueryBus';
import { UserRequest } from '../../routes';
import { Controller } from '../Controller';

export class ProfileGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: UserRequest, res: Response): Promise<void> {
    try {
      const id = req.user?.id;

      const query = new FindUserQuery(id);
      const users = await this.queryBus.ask<UserResponse[]>(query);

      res.status(httpStatus.OK).send(users);
    } catch (error) {
      if (error instanceof UserNotFound) {
        res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });
        return;
      }
      throw error;
    }
  }
}
