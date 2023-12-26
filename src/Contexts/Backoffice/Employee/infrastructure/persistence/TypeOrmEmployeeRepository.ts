import { EntitySchema, Not } from 'typeorm';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { EmailAddress } from '../../../../Shared/domain/value-object/EmailAddress';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { Employee } from '../../domain/Employee';
import { EmployeeId } from '../../domain/EmployeeId';
import { EmployeeRepository } from '../../domain/EmployeeRepository';
import { EmployeeEntity } from './typeorm/EmployeeEntity';

export class TypeOrmEmployeeRepository
  extends TypeOrmRepository<Employee>
  implements EmployeeRepository
{
  async remove(id: EmployeeId): Promise<void> {
    const repository = await this.repository();

    await repository.delete({ id: { value: id.value } });
  }

  save(user: Employee): Promise<void> {
    return this.persist(user);
  }

  async search(id: EmployeeId): Promise<Nullable<Employee>> {
    const repository = await this.repository();

    const user = await repository.findOneBy({ id: { value: id.value } });

    return user;
  }

  async searchAll(id: EmployeeId): Promise<Employee[]> {
    const repository = await this.repository();

    const users = await repository.find({
      where: { id: { value: Not(id.value) } }
    });

    return users;
  }

  async searchByEmail(email: EmailAddress): Promise<Nullable<Employee>> {
    const repository = await this.repository();

    const user = await repository.findOneBy({ email: { value: email.value } });

    return user;
  }

  protected entitySchema(): EntitySchema<Employee> {
    return EmployeeEntity;
  }
}
