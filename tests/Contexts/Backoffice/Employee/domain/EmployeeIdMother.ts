import { EmployeeId } from '../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeId';
import { UuidMother } from '../../../Shared/domain/UuidMother';

export class EmployeeIdMother {
  static create(value: string): EmployeeId {
    return new EmployeeId(value);
  }

  static random(): EmployeeId {
    return this.create(UuidMother.random());
  }
}
