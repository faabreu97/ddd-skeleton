import { EntitySchema } from 'typeorm';
import { EmailAddress } from '../../../../../Shared/domain/value-object/EmailAddress';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { BackofficeUser } from '../../../domain/BackofficeUser';
import { BackofficeUserId } from '../../../domain/BackofficeUserId';
import { BackofficeUserName } from '../../../domain/BackofficeUserName';

export const BackofficeUserEntity = new EntitySchema<BackofficeUser>({
  name: 'BackofficeUser',
  tableName: 'backoffice_users',
  target: BackofficeUser,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      transformer: ValueObjectTransformer(BackofficeUserId)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(BackofficeUserName)
    },
    email: {
      type: String,
      unique: true,
      transformer: ValueObjectTransformer(EmailAddress)
    }
  }
});
