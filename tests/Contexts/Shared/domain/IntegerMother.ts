import { MotherCreator } from './MotherCreator';

export class IntegerMother {
  static random(params?: { max?: number; min?: number }): number {
    return MotherCreator.random().number.int(params);
  }
}
