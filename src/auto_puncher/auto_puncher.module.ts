import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AutoPuncher } from 'src/entity/auto_puncher.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { CheckSheetMiddleware } from 'src/middleware/sheet.middleware';
import { UserModule } from 'src/user/user.module';
import { AutoPuncherController } from './auto_puncher.controller';
import { AutoPuncherRepository } from './auto_puncher.repository';
import { AutoPuncherService } from './auto_puncher.service';

@Module({
  imports: [UserModule],
  providers: [
    AutoPuncherRepository,
    AutoPuncherService,
    { provide: 'AutoPuncher', useValue: AutoPuncher },
  ],
  controllers: [AutoPuncherController],
})
export class AutoPuncherModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('auto-puncher');
    consumer.apply(CheckSheetMiddleware).forRoutes('auto-puncher/record/edit');
  }
}
