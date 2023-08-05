import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  getUserById(id: string): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const user = new User(login, password);

    return this.repository.save(user, { reload: true });
  }

  updateUser(
    user: User,
    { oldPassword, newPassword }: UpdateUserDto,
  ): Promise<User> {
    if (user.password !== oldPassword) {
      throw new ForbiddenException();
    }

    user.password = newPassword;

    return this.repository.save(user, { reload: true });
  }

  async deleteUser(user: User): Promise<boolean> {
    const deleteResult = await this.repository.delete({ id: user.id });

    return !!deleteResult.affected;
  }
}
