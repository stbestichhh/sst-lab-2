import { AbstractRepository } from '../database/abstract.repository';
import { Record } from '../database/models';
import { InjectModel } from '@nestjs/sequelize';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreationAttributes } from 'sequelize/types/model';
import { v7 as uuidv7 } from 'uuid';
import { Transaction, ValidationError } from 'sequelize';

@Injectable()
export class RecordRepository extends AbstractRepository<Record> {
  constructor(@InjectModel(Record) protected readonly model: typeof Record) {
    super(model);
  }

  public async create(
    dto: CreationAttributes<Record>,
    transaction?: Transaction,
  ) {
    return (await this.model
      .create(
        {
          id: uuidv7(),
          ...dto,
        } as CreationAttributes<Record>,
        { transaction },
      )
      .catch((e) => {
        if (e instanceof ValidationError) {
          throw new ForbiddenException(e.message);
        }
        this.logger.error(e);
        throw new InternalServerErrorException();
      })) as Record;
  }
}
