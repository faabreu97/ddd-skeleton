import { EmployeeName } from '../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeName';
import { MotherCreator } from '../../../Shared/domain/MotherCreator';

export class EmployeeNameMother {
  static create(value: string): EmployeeName {
    return new EmployeeName(value);
  }

  static random(): EmployeeName {
    return this.create(MotherCreator.random().person.fullName());
  }
}
