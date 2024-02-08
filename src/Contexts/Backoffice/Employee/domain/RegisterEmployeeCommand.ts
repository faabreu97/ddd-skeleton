import { Command } from '../../../Shared/domain/Command';
import { Primitives } from '../../../Shared/domain/Primitives';

export class RegisterEmployeeCommand extends Command {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  password: string;
  role: string;

  constructor(data: Primitives<RegisterEmployeeCommand>) {
    super();
    this.id = data.id;
    this.employeeId = data.employeeId;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
  }
}
