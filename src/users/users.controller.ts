import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
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
import { UserSerializer } from './user.serializer';

@Controller('')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly userSerializer: UserSerializer,
  ) {}

  @Get('/users')
  getAllUsers() {
    return this.userService
      .getAllUsers()
      .map((user) => this.userSerializer.serialize(user));
  }

  @Post('/users')
  @HttpCode(201)
  createUser(@Body() dto: CreateUserDto): Omit<User, 'password'> {
    if (!dto.login || !dto.password) {
      throw new BadRequestException('Invalid dto format');
    }
    const user = this.userService.createUser(dto);

    return this.userSerializer.serialize(user);
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId format');
    }

    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.userSerializer.serialize(user);
  }

  @Put('/user/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
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

    return this.userSerializer.serialize(user);
  }

  @Delete('/user/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId format');
    }

    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    if (!this.userService.deleteUser(user)) {
      throw new InternalServerErrorException();
    }
  }
}
