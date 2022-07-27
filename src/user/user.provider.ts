import { User } from 'src/entity/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
export const userProviders = [
  {
    provide: 'User',
    useValue: User,
  },
  {
    provide: 'UserService',
    useValue: UserService,
  },
];
