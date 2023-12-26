import { Response } from '../../../Shared/domain/Response';
import { Employee } from '../domain/Employee';

export class EmployeeResponse implements Response {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly role: string;

  constructor(user: Employee) {
    this.id = user.id.value;
    this.name = user.name.value;
    this.email = user.email.value;
    this.role = user.role.value;
  }
}
