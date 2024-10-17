import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [RecordService, DatabaseService],
  controllers: [RecordController],
  imports: [DatabaseModule.register(['records'])],
})
export class RecordModule {}
