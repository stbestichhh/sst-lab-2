import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { DatabaseModule } from '../database/database.module';
import { Account, Record } from '../database/models';
import { RecordRepository } from './record.repository';
import { AccountRepository } from '../account/account.repository';

@Module({
  providers: [RecordService, RecordRepository, AccountRepository],
  controllers: [RecordController],
  imports: [DatabaseModule, DatabaseModule.forFeature([Record, Account])],
})
export class RecordModule {}
