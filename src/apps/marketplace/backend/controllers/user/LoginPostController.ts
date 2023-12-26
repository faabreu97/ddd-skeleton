import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import marketplaceConfig from '../../../../../Contexts/Marketplace/Shared/infrastructure/config';
import { LoginUserQuery } from '../../../../../Contexts/Marketplace/User/application/Login/LoginUserQuery';
import { UserResponse } from '../../../../../Contexts/Marketplace/User/application/UserResponse';
import { UserNotFound } from '../../../../../Contexts/Marketplace/User/domain/UserNotFound';
import { UserPasswordDoNotMatch } from '../../../../../Contexts/Marketplace/User/domain/UserPasswordDoNotMatch';
import { QueryBus } from '../../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from '../Controller';

type LoginPostRequest = Request & {
  body: {
    email: string;
    password: string;
  };
};

export default class RegisterPutController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(req: LoginPostRequest, res: Response) {
    try {
      const { email, password } = req.body;

      const query = new LoginUserQuery(email, password);
      const user = await this.queryBus.ask<UserResponse>(query);

      const token = this.generateAccessToken(user.id);

      res.status(httpStatus.CREATED).send({ access_token: token });
    } catch (error) {
      if (error instanceof UserNotFound) {
        res.status(httpStatus.NOT_FOUND).send({ message: error.message });
        return;
      }
      if (error instanceof UserPasswordDoNotMatch) {
        res.status(httpStatus.NOT_FOUND).send({ message: error.message });
        return;
      }
      throw error;
    }
  }

  private generateAccessToken(id: string) {
    return jwt.sign({ id }, marketplaceConfig.get('secret.jwt'), {
      expiresIn: '7d'
    });
  }
}
