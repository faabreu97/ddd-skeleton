import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { RegisterUserCommand } from '../../domain/RegisterUserCommand';
import { UserRegistrar } from './UserRegistrar';

export class RegisterUserCommandHandler
  implements CommandHandler<RegisterUserCommand>
{
  constructor(private userRegistrar: UserRegistrar) {}

  subscribedTo(): Command {
    return RegisterUserCommand;
  }

  async handle(command: RegisterUserCommand): Promise<void> {
    await this.userRegistrar.run(command);
  }
}
