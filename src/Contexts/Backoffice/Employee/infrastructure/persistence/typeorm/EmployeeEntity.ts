import { EntitySchema } from 'typeorm';
import { EmailAddress } from '../../../../../Shared/domain/value-object/EmailAddress';
import { Password } from '../../../../../Shared/domain/value-object/Password';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Employee } from '../../../domain/Employee';
import { EmployeeId } from '../../../domain/EmployeeId';
import { EmployeeName } from '../../../domain/EmployeeName';
import { EmployeeRole } from '../../../domain/EmployeeRole';

export const EmployeeEntity = new EntitySchema<Employee>({
  name: 'Employee',
  tableName: 'employees',
  target: Employee,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      transformer: ValueObjectTransformer(EmployeeId)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(EmployeeName)
    },
    email: {
      type: String,
      unique: true,
      transformer: ValueObjectTransformer(EmailAddress)
    },
    password: {
      type: String,
      transformer: ValueObjectTransformer(Password)
    },
    role: {
      type: String,
      transformer: ValueObjectTransformer(EmployeeRole)
    }
  }
});
