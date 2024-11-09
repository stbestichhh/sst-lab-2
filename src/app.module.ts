import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { RecordModule } from './record/record.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import * as Joi from 'joi';

@Module({
  controllers: [],
  providers: [AppService],
  imports: [
    UsersModule,
    DatabaseModule,
    CategoryModule,
    RecordModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        PORT: Joi.number().port().required(),
        HOST: Joi.string().hostname().required(),
      }),
    }),
  ],
})
export class AppModule {}
