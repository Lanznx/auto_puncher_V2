import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AutoPuncherModule } from './auto_puncher/auto_puncher.module';
// import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AutoPuncherModule,
    CatsModule,
    DatabaseModule,
    UserModule,
    // RouterModule.register([
    //   {
    //     path: 'user',
    //     module: UserModule,
    //   },
    // ]),
  ],
})
export class AppModule {}
