import { BackofficeUsersResponse } from '../../../../../../src/Contexts/Backoffice/User/application/SearchAll/BackofficeUsersResponse';
import { BackofficeUser } from '../../../../../../src/Contexts/Backoffice/User/domain/BackofficeUser';
import { Repeater } from '../../../../Shared/domain/Repeater';
import { BackofficeUserMother } from '../../domain/BackofficeUserMother';

export class BackofficeUsersResponseMother {
  static create(value: Array<BackofficeUser>): BackofficeUsersResponse {
    return new BackofficeUsersResponse(value);
  }

  static random(total?: number): BackofficeUsersResponse {
    return this.create(
      Repeater.random(BackofficeUserMother.random, total ?? 1)
    );
  }
}
