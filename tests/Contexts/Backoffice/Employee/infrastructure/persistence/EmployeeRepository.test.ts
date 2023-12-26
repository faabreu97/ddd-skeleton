import { EmployeeRepository } from '../../../../../../src/Contexts/Backoffice/Employee/domain/EmployeeRepository';
import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { EmployeeIdMother } from '../../domain/EmployeeIdMother';
import { EmployeeMother } from '../../domain/EmployeeMother';

const repository: EmployeeRepository = container.get(
  'Backoffice.Employee.domain.EmployeeRepository'
);
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'Backoffice.EnvironmentArranger'
);

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('EmployeeRepository', () => {
  describe('#save', () => {
    it('should save a Employee', async () => {
      const employee = await EmployeeMother.random();

      await repository.save(employee);
    });
  });
  describe('#search', () => {
    it('should search a Employee', async () => {
      const employee = await EmployeeMother.random();
      await repository.save(employee);

      const response = await repository.search(employee.id);

      expect(response).toEqual(employee);
    });
  });
  describe('#searchAll', () => {
    it('should search all Employees', async () => {
      const employeeId = EmployeeIdMother.random();
      const employee = await EmployeeMother.random();
      await repository.save(employee);

      const response = await repository.searchAll(employeeId);

      expect(response).toEqual([employee]);
    });
    it('should Employees be empty', async () => {
      const employee = await EmployeeMother.random();
      await repository.save(employee);

      const response = await repository.searchAll(employee.id);

      expect(response).toHaveLength(0);
    });
  });
  describe('#searchByEmail', () => {
    it('should search Employee by email', async () => {
      const employee = await EmployeeMother.random();
      await repository.save(employee);

      const response = await repository.searchByEmail(employee.email);

      expect(response).toEqual(employee);
    });
  });
  describe('#remove', () => {
    it('should remove Employee', async () => {
      const employee = await EmployeeMother.random();
      await repository.save(employee);

      await repository.remove(employee.id);

      const response = await repository.search(employee.id);

      expect(response).toEqual(null);
    });
  });
});
