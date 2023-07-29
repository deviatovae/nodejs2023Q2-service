import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { isUUID } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/users')
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Post('/users')
  createUser(@Body() dto: CreateUserDto): Omit<User, 'password'> {
    if (!dto.login || !dto.password) {
      throw new BadRequestException('Invalid dto format');
    }
    const user = this.userService.createUser(dto);

    const { id, login, version, createdAt, updatedAt } = user;
    return { id, login, version, createdAt, updatedAt };
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId format');
    }

    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put('/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId format');
    }

    if (!dto.oldPassword || !dto.newPassword) {
      throw new BadRequestException('Invalid dto format');
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException();
    }
    const userResult = this.userService.updateUser(user, dto);

    if (!userResult) {
      throw new BadRequestException();
    }

    return user;
  }
}
