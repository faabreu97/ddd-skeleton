import { Query } from '../../../../../Shared/domain/Query';

export class FindEmployeeQuery extends Query {
  readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}
