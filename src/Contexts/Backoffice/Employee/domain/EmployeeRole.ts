import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export enum EmployeeRoles {
  owner = 'owner',
  admin = 'admin',
  read = 'read'
}

export class EmployeeRole extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.checkValueIsValid(value);
  }

  private checkValueIsValid(value: string): void {
    if (!Object.keys(EmployeeRoles).includes(value)) {
      throw new InvalidArgumentError(
        `<${value}> is not a valid value for employee role`
      );
    }
  }
}
