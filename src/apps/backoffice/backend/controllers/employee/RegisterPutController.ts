import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { EmployeeAlreadyExist } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeeAlreadyExist';
import { EmployeeIdAlreadyExist } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeeIdAlreadyExist';
import { RegisterEmployeeCommand } from '../../../../../Contexts/Backoffice/Employee/domain/RegisterEmployeeCommand';
import { CommandBus } from '../../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from '../Controller';

type RegisterPutRequest = Request & {
  body: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  };
};

export default class RegisterPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: RegisterPutRequest, res: Response) {
    try {
      const { id, name, email, password, role } = req.body;
      const registerUserCommand = new RegisterEmployeeCommand({
        id,
        name,
        email,
        password,
        role
      });
      await this.commandBus.dispatch(registerUserCommand);

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      if (error instanceof EmployeeIdAlreadyExist) {
        res.status(httpStatus.FORBIDDEN).send({ message: error.message });
        return;
      }
      if (error instanceof EmployeeAlreadyExist) {
        res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
        return;
      }
      throw error;
    }
  }
}
