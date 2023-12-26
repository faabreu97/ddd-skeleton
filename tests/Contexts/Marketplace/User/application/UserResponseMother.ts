import { UserResponse } from '../../../../../src/Contexts/Marketplace/User/application/UserResponse';
import { User } from '../../../../../src/Contexts/Marketplace/User/domain/User';

export class UserResponseMother {
  static create(value: User): UserResponse {
    return new UserResponse(value);
  }
}
