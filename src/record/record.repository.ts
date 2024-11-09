import { AbstractRepository } from '../database/abstract.repository';
import { Record } from '../database/models';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecordRepository extends AbstractRepository<Record> {
  constructor(@InjectModel(Record) protected readonly model: typeof Record) {
    super(model);
  }
}
