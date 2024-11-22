import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { DatabaseModule } from '../database/database.module';
import { Account } from '../database/models';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  providers: [AccountService, AccountRepository, JwtStrategy],
  controllers: [AccountController],
  imports: [DatabaseModule.forFeature([Account])],
})
export class AccountModule {}
