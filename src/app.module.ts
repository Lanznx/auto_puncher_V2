import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AutoPuncherModule } from './auto_puncher/auto_puncher.module';
import { AutoPuncher } from './auto_puncher';

@Module({
  imports: [
    CatsModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AutoPuncherModule,
  ],
  providers: [AutoPuncher],
})
export class AppModule {}
