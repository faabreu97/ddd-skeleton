import { EmployeeResponse } from '../../../../../src/Contexts/Backoffice/Employee/application/EmployeeResponse';
import { Employee } from '../../../../../src/Contexts/Backoffice/Employee/domain/Employee';

export class EmployeeResponseMother {
  static create(value: Employee): EmployeeResponse {
    return new EmployeeResponse(value);
  }
}
