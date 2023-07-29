import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSerializer } from './user.serializer';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserSerializer],
})
export class UsersModule {}
