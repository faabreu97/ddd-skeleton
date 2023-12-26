import { BackofficeUserId } from '../../../../../src/Contexts/Backoffice/User/domain/BackofficeUserId';
import { UuidMother } from '../../../Shared/domain/UuidMother';

export class BackofficeUserIdMother {
  static create(value: string): BackofficeUserId {
    return new BackofficeUserId(value);
  }

  static random(): BackofficeUserId {
    return this.create(UuidMother.random());
  }
}
