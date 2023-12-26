import { Nullable } from '../../../../Shared/domain/Nullable';
import { Criteria } from '../../../../Shared/domain/criteria/Criteria';
import { EmailAddress } from '../../../../Shared/domain/value-object/EmailAddress';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserRepository } from '../../domain/UserRepository';

interface UserDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export class MongoUserRepository
  extends MongoRepository<User>
  implements UserRepository
{
  protected collectionName(): string {
    return 'users';
  }

  save(user: User): Promise<void> {
    return this.persist(user.id.value, user);
  }

  async search(userId: UserId): Promise<Nullable<User>> {
    const collection = await this.collection();
    const document = await collection.findOne<UserDocument>({
      _id: userId.value as any
    });

    return document
      ? User.fromPrimitives({
          name: document.name,
          email: document.email,
          password: document.password,
          id: userId.value
        })
      : null;
  }

  async searchByEmail(email: EmailAddress): Promise<Nullable<User>> {
    const collection = await this.collection();
    const document = await collection.findOne<UserDocument>({
      email: email.value
    });

    return document
      ? User.fromPrimitives({
          name: document.name,
          email: document.email,
          password: document.password,
          id: document._id
        })
      : null;
  }

  async matching(criteria: Criteria): Promise<User[]> {
    const documents = await this.searchByCriteria<UserDocument>(criteria);

    return documents.map(document =>
      User.fromPrimitives({
        name: document.name,
        email: document.email,
        password: document.password,
        id: document._id
      })
    );
  }
}
