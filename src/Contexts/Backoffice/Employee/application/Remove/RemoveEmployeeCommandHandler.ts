import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { RemoveEmployeeCommand } from '../../domain/RemoveEmployeeCommand';
import { EmployeeRemover } from './EmployeeRemover';

export class RemoveEmployeeCommandHandler
  implements CommandHandler<RemoveEmployeeCommand>
{
  constructor(private userRemover: EmployeeRemover) {}

  subscribedTo(): Command {
    return RemoveEmployeeCommand;
  }

  async handle(command: RemoveEmployeeCommand): Promise<void> {
    await this.userRemover.run(command);
  }
}
