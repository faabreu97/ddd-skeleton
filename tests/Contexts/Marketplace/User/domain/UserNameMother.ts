import { UserName } from '../../../../../src/Contexts/Marketplace/User/domain/UserName';
import { MotherCreator } from '../../../Shared/domain/MotherCreator';

export class UserNameMother {
  static create(value: string): UserName {
    return new UserName(value);
  }

  static random(): UserName {
    return this.create(MotherCreator.random().person.fullName());
  }
}
