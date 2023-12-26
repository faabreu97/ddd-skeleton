import { Response } from 'express';
import httpStatus from 'http-status';
import { EmployeeNotFound } from '../../../../../Contexts/Backoffice/Employee/domain/EmployeeNotFound';
import { RemoveEmployeeCommand } from '../../../../../Contexts/Backoffice/Employee/domain/RemoveEmployeeCommand';
import { CommandBus } from '../../../../../Contexts/Shared/domain/CommandBus';
import { ForbiddenError } from '../../../../../Contexts/Shared/domain/ForbiddenError';
import { UserRequest } from '../../routes';
import { Controller } from '../Controller';

export default class EmployeeDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: UserRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const idToDelete = req.params.id as string;
      const removeUserCommand = new RemoveEmployeeCommand({
        employeeId: userId,
        idToDelete
      });
      await this.commandBus.dispatch(removeUserCommand);

      res.status(httpStatus.OK).send();
    } catch (error) {
      if (error instanceof ForbiddenError) {
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
