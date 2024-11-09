import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { DatabaseModule } from '../database/database.module';
import { Record } from '../database/models';

@Module({
  providers: [RecordService],
  controllers: [RecordController],
  imports: [DatabaseModule.forFeature([Record])],
})
export class RecordModule {}
