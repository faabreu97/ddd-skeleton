import {
  EmployeeRole,
  EmployeeRoles
} from '../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRole';
import { MotherCreator } from '../../../Shared/domain/MotherCreator';

export class EmployeeRoleMother {
  static create(value: EmployeeRoles): EmployeeRole {
    return new EmployeeRole(value);
  }

  static random(): EmployeeRole {
    return this.create(MotherCreator.random().helpers.enumValue(EmployeeRoles));
  }
}
