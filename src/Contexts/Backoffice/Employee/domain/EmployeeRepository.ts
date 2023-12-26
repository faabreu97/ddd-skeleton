import { Nullable } from '../../../Shared/domain/Nullable';
import { EmailAddress } from '../../../Shared/domain/value-object/EmailAddress';
import { Employee } from './Employee';
import { EmployeeId } from './EmployeeId';

export interface EmployeeRepository {
  save(user: Employee): Promise<void>;
  search(id: EmployeeId): Promise<Nullable<Employee>>;
  searchAll(id: EmployeeId): Promise<Employee[]>;
  searchByEmail(email: EmailAddress): Promise<Nullable<Employee>>;
  remove(id: EmployeeId): Promise<void>;
}
