import { Command } from '../../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../../Shared/domain/CommandHandler';
import { ChangeEmployeePasswordCommand } from '../../../domain/ChangeEmployeePasswordCommand';
import { EmployeePasswordEditor } from './EmployeePasswordEditor';

export class ChangeEmployeePasswordCommandHandler
  implements CommandHandler<ChangeEmployeePasswordCommand>
{
  constructor(private editor: EmployeePasswordEditor) {}

  subscribedTo(): Command {
    return ChangeEmployeePasswordCommand;
  }

  handle(command: ChangeEmployeePasswordCommand): Promise<void> {
    return this.editor.run(command);
  }
}
