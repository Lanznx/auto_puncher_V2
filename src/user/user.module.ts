import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { userProviders } from './user.provider';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  providers: [UserService, UserRepository, ...userProviders],
  controllers: [UserController],
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
