import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { DatabaseModule } from '../database/database.module';
import { Record } from '../database/models';
import { RecordRepository } from './record.repository';

@Module({
  providers: [RecordService, RecordRepository],
  controllers: [RecordController],
  imports: [DatabaseModule.forFeature([Record])],
})
export class RecordModule {}
