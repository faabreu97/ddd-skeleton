import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { RegisterEmployeeCommand } from '../../domain/RegisterEmployeeCommand';
import { EmployeeRegistrar } from './EmployeeRegistrar';

export class RegisterEmployeeCommandHandler
  implements CommandHandler<RegisterEmployeeCommand>
{
  constructor(private userRegistrar: EmployeeRegistrar) {}

  subscribedTo(): Command {
    return RegisterEmployeeCommand;
  }

  async handle(command: RegisterEmployeeCommand): Promise<void> {
    await this.userRegistrar.run(command);
  }
}
