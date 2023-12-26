import { BackofficeUser } from '../../domain/BackofficeUser';
import { BackofficeUserResponse } from './BackofficeUserResponse';

export class BackofficeUsersResponse {
  public readonly users: Array<BackofficeUserResponse>;

  constructor(users: Array<BackofficeUser>) {
    this.users = users.map(user => user.toPrimitives());
  }
}
