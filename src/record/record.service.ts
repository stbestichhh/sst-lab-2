import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRecordDto } from './dto';
import { RecordRepository } from './record.repository';
import { AccountRepository } from '../account/account.repository';
import { Sequelize } from 'sequelize';

@Injectable()
export class RecordService {
  constructor(
    private readonly recordRepository: RecordRepository,
    private readonly accountRepository: AccountRepository,
    private readonly sequelize: Sequelize,
  ) {}

  public async get(recordId: string) {
    return await this.recordRepository.findByPk(recordId);
  }

  public async getAll(options: { userId?: number; categoryId?: number }) {
    return await this.recordRepository.findAll(options);
  }

  public async create(dto: CreateRecordDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const record = await this.recordRepository.create(dto, transaction);
      const account = await this.accountRepository.findByPk(
        record.userId,
        transaction,
      );
      const money = account.money - record.spentAmount;

      if (money < 0) {
        await transaction.rollback();
        return new ForbiddenException(
          `You dont have enough money for this record`,
        );
      }
      await account.set({ money }).save({ transaction });
      await transaction.commit();
      return record;
    } catch (e) {
      await transaction.rollback();
      throw new InternalServerErrorException(`Transaction rolled back`);
    }
  }

  public async delete(recordId: string) {
    return await this.recordRepository.delete(recordId);
  }
}
