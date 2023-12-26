import { BackofficeUser } from '../../../../../src/Contexts/Backoffice/User/domain/BackofficeUser';
import { BackofficeUserRepository } from '../../../../../src/Contexts/Backoffice/User/domain/BackofficeUserRepository';
import { Criteria } from '../../../../../src/Contexts/Shared/domain/criteria/Criteria';

export class BackofficeUserRepositoryMock implements BackofficeUserRepository {
  private saveMock: jest.Mock;
  // private searchMock: jest.Mock;
  private searchAllMock: jest.Mock;
  private matchingMock: jest.Mock;

  // private user: Nullable<BackofficeUser> = null;
  private users: Array<BackofficeUser> = [];

  constructor() {
    this.saveMock = jest.fn();
    // this.searchMock = jest.fn();
    this.searchAllMock = jest.fn();
    this.matchingMock = jest.fn();
  }
  async matching(criteria: Criteria): Promise<BackofficeUser[]> {
    this.matchingMock(criteria);
    return this.users;
  }

  returnOnSearchMatching(users: Array<BackofficeUser>) {
    this.users = users;
  }

  async searchAll(): Promise<BackofficeUser[]> {
    this.searchAllMock();
    return this.users;
  }

  assertSearchAll() {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  returnOnSearchAll(users: Array<BackofficeUser>) {
    this.users = users;
  }

  async save(user: BackofficeUser): Promise<void> {
    this.saveMock(user);
  }

  assertSaveHaveBeenCalledWith(expected: BackofficeUser): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertSave(): void {
    expect(this.saveMock).toHaveBeenCalled();
  }

  // async search(id: BackofficeUserId): Promise<Nullable<BackofficeUser>> {
  //   this.searchMock(id);
  //   return this.user;
  // }

  // returnOnSearch(user: BackofficeUser) {
  //   this.user = user;
  // }

  // assertSearch(times?: number) {
  //   expect(this.searchMock).toHaveBeenCalledTimes(times ?? 1);
  // }
}
