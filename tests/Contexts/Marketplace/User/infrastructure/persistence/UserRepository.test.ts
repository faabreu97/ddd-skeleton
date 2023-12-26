import { UserRepository } from '../../../../../../src/Contexts/Marketplace/User/domain/UserRepository';
import { Criteria } from '../../../../../../src/Contexts/Shared/domain/criteria/Criteria';
import { Operator } from '../../../../../../src/Contexts/Shared/domain/criteria/FilterOperator';
import { Filters } from '../../../../../../src/Contexts/Shared/domain/criteria/Filters';
import { Order } from '../../../../../../src/Contexts/Shared/domain/criteria/Order';
import container from '../../../../../../src/apps/marketplace/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { UserMother } from '../../domain/UserMother';

const repository: UserRepository = container.get(
  'Marketplace.User.domain.UserRepository'
);
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'Marketplace.EnvironmentArranger'
);

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('UserRepository', () => {
  describe('#save', () => {
    it('should save a user', async () => {
      const user = await UserMother.random();

      await repository.save(user);
    });
  });
  describe('#search', () => {
    it('should search a user', async () => {
      const user = await UserMother.random();
      await repository.save(user);

      const response = await repository.search(user.id);

      expect(response).toEqual(user);
    });
  });
  describe('#searchByEmail', () => {
    it('should search User by email', async () => {
      const user = await UserMother.random();
      await repository.save(user);

      const response = await repository.searchByEmail(user.email);

      expect(response).toEqual(user);
    });
  });
  describe('#matching', () => {
    it('should match user by email', async () => {
      const user = await UserMother.random();
      await repository.save(user);

      const anotherUser = await UserMother.random();
      await repository.save(anotherUser);

      const filter = new Map([
        ['field', 'email'],
        ['operator', Operator.EQUAL],
        ['value', user.email.value]
      ]);
      const criteria = new Criteria(Filters.fromValues([filter]), Order.none());

      const response = await repository.matching(criteria);

      expect(response).toEqual([user]);
    });
    it('should match user by name', async () => {
      const user = await UserMother.random();
      await repository.save(user);

      const anotherUser = await UserMother.random();
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
  });
});
