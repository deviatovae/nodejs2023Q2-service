import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserSerializer {
  serialize({ id, login, version, createdAt, updatedAt }: User) {
    return {
      id,
      login,
      version,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    };
  }
}
