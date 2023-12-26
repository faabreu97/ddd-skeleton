import { BackofficeUserRepository } from '../../domain/BackofficeUserRepository';

export class BackofficeUsersFinder {
  constructor(private repository: BackofficeUserRepository) {}

  async run() {
    return this.repository.searchAll();
  }
}
