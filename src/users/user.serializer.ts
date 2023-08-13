import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserSerializer {
  serialize({
    id,
    login,
    version,
    createdAt,
    updatedAt,
  }: User): Omit<User, 'password'> {
    return { id, login, version, createdAt, updatedAt };
  }
}
