import { faker } from '@faker-js/faker';

export class MotherCreator {
  static random(): typeof faker {
    return faker;
  }
}
