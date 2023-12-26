import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { EmployeeResponse } from '../../../../../Contexts/Backoffice/Employee/application/EmployeeResponse';
import { LoginEmployeeQuery } from '../../../../../Contexts/Backoffice/Employee/application/Login/LoginEmployeeQuery';
import { EmployeeNotFound } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeeNotFound';
import { EmployeePasswordDoNotMatch } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeePasswordDoNotMatch';
import backofficeConfig from '../../../../../Contexts/Backoffice/Shared/infrastructure/config';
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

      const query = new LoginEmployeeQuery(email, password);
      const user = await this.queryBus.ask<EmployeeResponse>(query);

      const token = this.generateAccessToken(user.id);

      res.status(httpStatus.CREATED).send({ access_token: token });
    } catch (error) {
      if (error instanceof EmployeeNotFound) {
        res.status(httpStatus.NOT_FOUND).send({ message: error.message });
        return;
      }
      if (error instanceof EmployeePasswordDoNotMatch) {
        res.status(httpStatus.NOT_FOUND).send({ message: error.message });
        return;
      }
      throw error;
    }
  }

  private generateAccessToken(id: string) {
    return jwt.sign({ id }, backofficeConfig.get('secret.jwt'), {
      expiresIn: '7d'
    });
  }
}
