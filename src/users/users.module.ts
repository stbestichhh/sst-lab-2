import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { User } from '../database/models';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [DatabaseModule.forFeature([User])],
})
export class UsersModule {}
