import { Sequelize } from 'sequelize-typescript';
import { Cat } from '../entity/cat.entity';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entity/user.entity';
import { AutoPuncher } from 'src/entity/auto_puncher.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
      });
      sequelize.addModels([Cat, User, AutoPuncher]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
