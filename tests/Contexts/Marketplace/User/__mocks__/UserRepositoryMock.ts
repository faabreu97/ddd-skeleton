import { User } from '../../../../../src/Contexts/Marketplace/User/domain/User';
import { UserId } from '../../../../../src/Contexts/Marketplace/User/domain/UserId';
import { UserRepository } from '../../../../../src/Contexts/Marketplace/User/domain/UserRepository';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import { Criteria } from '../../../../../src/Contexts/Shared/domain/criteria/Criteria';
import { EmailAddress } from '../../../../../src/Contexts/Shared/domain/value-object/EmailAddress';

export class UserRepositoryMock implements UserRepository {
  private saveMock: jest.Mock;
  private searchMock: jest.Mock;
  private searchByEmailMock: jest.Mock;
  private matchingMock: jest.Mock;

  private user: Nullable<User> = null;

  constructor() {
    this.saveMock = jest.fn();
    this.searchMock = jest.fn();
    this.searchByEmailMock = jest.fn();
    this.matchingMock = jest.fn();
  }
  async matching(criteria: Criteria): Promise<User[]> {
    this.matchingMock(criteria);
    return [this.user!];
  }

  async save(user: User): Promise<void> {
    this.saveMock(user);
  }

  assertSaveHaveBeenCalledWith(expected: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSave(): void {
    expect(this.saveMock).toHaveBeenCalled();
  }

  async search(id: UserId): Promise<Nullable<User>> {
    this.searchMock(id);
    return this.user;
  }

  returnOnSearch(user: User) {
    this.user = user;
  }

  assertSearch(times?: number) {
    expect(this.searchMock).toHaveBeenCalledTimes(times ?? 1);
  }

  async searchByEmail(email: EmailAddress): Promise<Nullable<User>> {
    this.searchByEmailMock(email);
    return this.user;
  }

  assertSearchByEmail() {
    expect(this.searchByEmailMock).toHaveBeenCalled();
  }
}
