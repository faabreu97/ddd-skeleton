import { Response } from '../../../Shared/domain/Response';
import { User } from '../domain/User';

export class UserResponse implements Response {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;

  constructor(user: User) {
    this.id = user.id.value;
    this.name = user.name.value;
    this.email = user.email.value;
  }
}
