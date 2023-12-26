import { Query } from '../../../../Shared/domain/Query';

export class LoginUserQuery extends Query {
  readonly email: string;
  readonly password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}
