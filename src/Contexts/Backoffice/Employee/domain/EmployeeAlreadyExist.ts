import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class EmployeeAlreadyExist extends InvalidArgumentError {
  constructor(message?: string) {
    super(message ?? 'User already exist');
  }
}
