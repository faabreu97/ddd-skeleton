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

  private user: Nullable<Employee> = null;

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
    return this.user ? [this.user] : [];
  }

  assertSearchAll() {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  async save(user: Employee): Promise<void> {
    this.saveMock(user);
  }

  assertSaveHaveBeenCalledWith(expected: Employee): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSave(): void {
    expect(this.saveMock).toHaveBeenCalled();
  }

  async search(id: EmployeeId): Promise<Nullable<Employee>> {
    this.searchMock(id);
    return this.user;
  }

  returnOnSearch(user: Employee) {
    this.user = user;
  }

  assertSearch(times?: number) {
    expect(this.searchMock).toHaveBeenCalledTimes(times ?? 1);
  }

  async searchByEmail(email: EmailAddress): Promise<Nullable<Employee>> {
    this.searchByEmailMock(email);
    return this.user;
  }

  assertSearchByEmail() {
    expect(this.searchByEmailMock).toHaveBeenCalled();
  }
}
