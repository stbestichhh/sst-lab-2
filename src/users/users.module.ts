import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [UsersService, DatabaseService],
  controllers: [UsersController],
  imports: [DatabaseModule.register(['users'])],
})
export class UsersModule {}
