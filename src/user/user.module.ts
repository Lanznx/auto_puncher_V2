import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { userProviders } from './user.provider';
import { UserController } from './user.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserService, UserRepository, ...userProviders],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: 'user/signUp',
          method: RequestMethod.POST,
        },
        {
          path: 'user/signIn',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('user');
  }
}
