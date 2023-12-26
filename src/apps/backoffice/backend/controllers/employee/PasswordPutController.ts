import { Response } from 'express';
import httpStatus from 'http-status';
import { ChangeEmployeePasswordCommand } from '../../../../../Contexts/Backoffice/Employee/domain/ChangeEmployeePasswordCommand';
import { EmployeeNotFound } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeeNotFound';
import { EmployeePasswordDoNotMatch } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeePasswordDoNotMatch';
import { CommandBus } from '../../../../../Contexts/Shared/domain/CommandBus';
import { UserRequest } from '../../routes';
import { Controller } from '../Controller';

type PasswordPutRequest = UserRequest & {
  body: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
};

export default class PasswordPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: PasswordPutRequest, res: Response) {
    try {
      const id = req.user.id;
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const changeUserPasswordCommand = new ChangeEmployeePasswordCommand({
        id,
        oldPassword,
        newPassword,
        confirmPassword
      });
      await this.commandBus.dispatch(changeUserPasswordCommand);

      res.status(httpStatus.OK).send();
    } catch (error) {
      if (error instanceof EmployeeNotFound) {
        res.status(httpStatus.NOT_FOUND).send({ message: error.message });
        return;
      }
      if (error instanceof EmployeePasswordDoNotMatch) {
        res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
        return;
      }
      throw error;
    }
  }
}
