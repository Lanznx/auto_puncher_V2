import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cat.repository';
import { catProviders } from './cat.provider';

@Module({
  providers: [CatsService, CatsRepository, ...catProviders],
  controllers: [CatsController],
})
export class CatsModule {}
