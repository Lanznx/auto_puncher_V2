import { Cat } from 'src/entity/cat.entity';
import { CatsRepository } from './cat.repository';
export const catProviders = [
  {
    provide: 'Cat',
    useValue: Cat,
  },
  {
    provide: 'CatsRepository',
    useValue: CatsRepository,
  },
];
