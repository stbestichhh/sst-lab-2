import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { DatabaseModule } from '../database/database.module';
import { Account } from '../database/models';

@Module({
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
  imports: [DatabaseModule.forFeature([Account])],
})
export class AccountModule {}
