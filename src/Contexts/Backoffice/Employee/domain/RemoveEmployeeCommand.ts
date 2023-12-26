import { Command } from '../../../Shared/domain/Command';
import { Primitives } from '../../../Shared/domain/Primitives';

export class RemoveEmployeeCommand extends Command {
  employeeId: string;
  idToDelete: string;

  constructor(data: Primitives<RemoveEmployeeCommand>) {
    super();
    this.employeeId = data.employeeId;
    this.idToDelete = data.idToDelete;
  }
}
