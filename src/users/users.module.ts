import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { User } from '../database/models';
import { UserRepository } from './user.repository';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  providers: [UsersService, UserRepository, JwtStrategy],
  controllers: [UsersController],
  imports: [DatabaseModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
