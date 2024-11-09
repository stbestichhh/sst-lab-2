import { AbstractRepository } from '../database/abstract.repository';
import { Record } from '../database/models';
import { Inject } from '@nestjs/common';

export class RecordRepository extends AbstractRepository<Record> {
  constructor(@Inject(Record) protected readonly model: typeof Record) {
    super(model);
  }
}
