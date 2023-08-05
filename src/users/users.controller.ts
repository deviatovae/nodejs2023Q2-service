import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { isUUID } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  createUser(@Body() dto: CreateUserDto) {
    if (!dto.login || !dto.password) {
      throw new BadRequestException('Invalid dto format');
    }

    return this.userService.createUser(dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId format');
    }

    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
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

    const userResult = await this.userService.updateUser(user, dto);
    if (!userResult) {
      throw new BadRequestException();
    }

    return userResult;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId format');
    }

    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    if (!(await this.userService.deleteUser(user))) {
      throw new InternalServerErrorException();
    }
  }
}
