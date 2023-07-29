import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  createUser({ login, password }: CreateUserDto): User {
    const user = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);
    return user;
  }

  updateUser(user: User, { oldPassword, newPassword }: UpdateUserDto): User {
    if (user.password !== oldPassword) {
      throw new ForbiddenException();
    }

    user.password = newPassword;
    user.version = user.version + 1;

    return user;
  }
}
