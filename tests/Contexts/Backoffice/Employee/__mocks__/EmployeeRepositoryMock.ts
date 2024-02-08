import { Employee } from '../../../../../src/Contexts/Backoffice/Employee/domain/Employee';
import { EmployeeId } from '../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeId';
import { EmployeeRepository } from '../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRepository';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import { EmailAddress } from '../../../../../src/Contexts/Shared/domain/value-object/EmailAddress';

export class EmployeeRepositoryMock implements EmployeeRepository {
  private saveMock: jest.Mock;
  private searchMock: jest.Mock;
  private searchAllMock: jest.Mock;
  private searchByEmailMock: jest.Mock;
  private removeMock: jest.Mock;

  private employees: Employee[] = [];

  constructor() {
    this.saveMock = jest.fn();
    this.searchMock = jest.fn();
    this.searchByEmailMock = jest.fn();
    this.searchAllMock = jest.fn();
    this.removeMock = jest.fn();
  }
  remove(id: EmployeeId): Promise<void> {
    return this.removeMock(id);
  }

  assertRemove() {
    expect(this.removeMock).toHaveBeenCalled();
  }

  async searchAll(): Promise<Employee[]> {
    this.searchAllMock();
    return this.employees ? this.employees : [];
  }

  assertSearchAll() {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  async save(employee: Employee): Promise<void> {
    this.saveMock(employee);
  }

  assertSaveHaveBeenCalledWith(expected: Employee): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSave(): void {
    expect(this.saveMock).toHaveBeenCalled();
  }

  async search(id: EmployeeId): Promise<Nullable<Employee>> {
    this.searchMock(id);
    return this.employees.length > 0 ? this.employees.pop() : null;
  }

  returnOnSearch(employee: Employee) {
    this.employees.push(employee);
  }

  assertSearch(times?: number) {
    expect(this.searchMock).toHaveBeenCalledTimes(times ?? 1);
  }

  async searchByEmail(email: EmailAddress): Promise<Nullable<Employee>> {
    this.searchByEmailMock(email);
    return this.employees.length > 0 ? this.employees.pop() : null;
  }

  assertSearchByEmail() {
    expect(this.searchByEmailMock).toHaveBeenCalled();
  }
}
