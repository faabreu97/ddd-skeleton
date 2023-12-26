import { BackofficeUserName } from '../../../../../src/Contexts/Backoffice/User/domain/BackofficeUserName';
import { MotherCreator } from '../../../Shared/domain/MotherCreator';

export class BackofficeUserNameMother {
  static create(value: string): BackofficeUserName {
    return new BackofficeUserName(value);
  }

  static random(): BackofficeUserName {
    return this.create(MotherCreator.random().person.fullName());
  }
}
