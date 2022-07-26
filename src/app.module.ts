import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
// import { RouterModule } from '@nestjs/core';
import { AutoPuncher } from './auto_puncher';
import { AutoPuncherService } from './auto_puncher/auto_puncher.service';
import { AutoPuncherController } from './auto_puncher/auto_puncher.controller';
import { AutoPuncherModule } from './auto_puncher/auto_puncher.module';

@Module({
  imports: [
    CatsModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AutoPuncherModule,
    // RouterModule.register([
    //   {
    //     path: 'user',
    //     module: UserModule,
    //   },
    // ]),
  ],
  providers: [AutoPuncher, AutoPuncherService],
  controllers: [AutoPuncherController],
})
export class AppModule {}
