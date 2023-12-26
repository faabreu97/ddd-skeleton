import { BackofficeUserRepository } from '../../../../../../src/Contexts/Backoffice/User/domain/BackofficeUserRepository';
import { Criteria } from '../../../../../../src/Contexts/Shared/domain/criteria/Criteria';
import { Operator } from '../../../../../../src/Contexts/Shared/domain/criteria/FilterOperator';
import { Filters } from '../../../../../../src/Contexts/Shared/domain/criteria/Filters';
import { Order } from '../../../../../../src/Contexts/Shared/domain/criteria/Order';
import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { BackofficeUserMother } from '../../domain/BackofficeUserMother';

const repository: BackofficeUserRepository = container.get(
  'Backoffice.User.domain.BackofficeUserRepository'
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

describe('BackofficeUserRepository', () => {
  describe('#save', () => {
    it('should save a backoffice user', async () => {
      const user = BackofficeUserMother.random();

      await repository.save(user);
    });
  });
  // describe('#search', () => {
  //   it('should search a BackofficeUser', async () => {
  //     const user = BackofficeUserMother.random();
  //     await repository.save(user);

  //     const response = await repository.search(user.id);

  //     expect(response).toEqual(user);
  //   });
  // });
  describe('#searchAll', () => {
    it('should search all backoffice users', async () => {
      const user = BackofficeUserMother.random();
      await repository.save(user);

      const response = await repository.searchAll();

      expect(response).toEqual([user]);
    });
  });
  describe('#matching', () => {
    it('should match backoffice users', async () => {
      const user = BackofficeUserMother.random();
      await repository.save(user);

      const filter = new Map([
        ['field', 'email'],
        ['operator', Operator.EQUAL],
        ['value', user.email.value]
      ]);
      const criteria = new Criteria(Filters.fromValues([filter]), Order.none());
      const response = await repository.matching(criteria);

      expect(response).toEqual([user]);
    });
    it('should match backoffice users by name', async () => {
      const user = BackofficeUserMother.random();
      await repository.save(user);

      const anotherUser = BackofficeUserMother.random();
      await repository.save(anotherUser);

      const filter = new Map([
        ['field', 'name'],
        ['operator', Operator.EQUAL],
        ['value', user.name.value]
      ]);
      const criteria = new Criteria(Filters.fromValues([filter]), Order.none());
      const response = await repository.matching(criteria);

      expect(response).toEqual([user]);
    });
    it('should match backoffice users not equal', async () => {
      const user = BackofficeUserMother.random();
      await repository.save(user);

      const anotherUser = BackofficeUserMother.random();
      await repository.save(anotherUser);

      const filter = new Map([
        ['field', 'name'],
        ['operator', Operator.NOT_EQUAL],
        ['value', user.name.value]
      ]);
      const criteria = new Criteria(Filters.fromValues([filter]), Order.none());
      const response = await repository.matching(criteria);

      expect(response).toEqual([anotherUser]);
    });
  });
});
