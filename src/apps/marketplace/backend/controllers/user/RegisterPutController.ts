import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import backofficeConfig from '../../../../../Contexts/Backoffice/Shared/infrastructure/config';
import { RegisterUserCommand } from '../../../../../Contexts/Marketplace/User/domain/RegisterUserCommand';
import { UserAlreadyExist } from '../../../../../Contexts/Marketplace/User/domain/UserAlreadyExist';
import { UserIdAlreadyExist } from '../../../../../Contexts/Marketplace/User/domain/UserIdAlreadyExist';
import { CommandBus } from '../../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from '../Controller';

type RegisterPutRequest = Request & {
  body: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
};

export default class RegisterPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: RegisterPutRequest, res: Response) {
    try {
      const { id, name, email, password } = req.body;
      const registerUserCommand = new RegisterUserCommand({
        id,
        name,
        email,
        password
      });
      await this.commandBus.dispatch(registerUserCommand);

      const token = this.generateAccessToken(id);

      res.status(httpStatus.CREATED).send({ access_token: token });
    } catch (error) {
      if (error instanceof UserIdAlreadyExist) {
        res.status(httpStatus.FORBIDDEN).send({ message: error.message });
        return;
      }
      if (error instanceof UserAlreadyExist) {
        res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
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
