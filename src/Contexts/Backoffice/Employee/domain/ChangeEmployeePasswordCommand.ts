import { Command } from '../../../Shared/domain/Command';
import { Primitives } from '../../../Shared/domain/Primitives';

export class ChangeEmployeePasswordCommand extends Command {
  id: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(data: Primitives<ChangeEmployeePasswordCommand>) {
    super();
    this.id = data.id;
    this.oldPassword = data.oldPassword;
    this.newPassword = data.newPassword;
    this.confirmPassword = data.confirmPassword;
  }
}
