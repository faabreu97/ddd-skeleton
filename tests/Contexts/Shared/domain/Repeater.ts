import { IntegerMother } from './IntegerMother';
export class Repeater {
  static random(callable: Function, iterations: number) {
    return Array(iterations || IntegerMother.random({ max: 20 }))
      .fill({})
      .map(() => callable());
  }
}
