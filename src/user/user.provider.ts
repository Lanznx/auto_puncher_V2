import { User } from 'src/entity/user.entity';
import { UserRepository } from './user.repository';
export const userProviders = [
  {
    provide: 'User',
    useValue: User,
  },
  {
    provide: 'UserRepository',
    useValue: UserRepository,
  },
];
