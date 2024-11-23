import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'node:process';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account, Category, Record, User } from './models';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().hostname().required(),
        POSTGRES_PORT: Joi.number().port().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        host:
          configService.get<string>('POSTGRES_HOST') ||
          process.env.POSTGRES_HOST,
        port:
          configService.get<number>('POSTGRES_PORT') ||
          Number(process.env.POSTGRES_PORT),
        username:
          configService.get<string>('POSTGRES_USER') ||
          process.env.POSTGRES_USER,
        password:
          configService.get<string>('POSTGRES_PASSWORD') ||
          process.env.POSTGRES_PASSWORD,
        database:
          configService.get<string>('POSTGRES_DB') || process.env.POSTGRES_DB,
        models: [User, Category, Record, Account],
        autoLoadModels: true,
        sync: {
          alter: true,
          force: process.env.NODE_ENV === 'development',
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  public static forFeature(entities: any[]) {
    return SequelizeModule.forFeature(entities);
  }
}
