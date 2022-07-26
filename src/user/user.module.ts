import { Module } from '@nestjs/common';
import { userProviders } from './user.provider';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepository, ...userProviders],
  controllers: [UserController],
})
export class UserModule {}
