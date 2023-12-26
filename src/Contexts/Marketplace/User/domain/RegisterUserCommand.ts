import { Command } from '../../../Shared/domain/Command';
import { Primitives } from '../../../Shared/domain/Primitives';

export class RegisterUserCommand extends Command {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(data: Primitives<RegisterUserCommand>) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
