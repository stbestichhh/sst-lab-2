import { AbstractRepository } from '../database/abstract.repository';
import { Account } from '../database/models';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction, WhereOptions } from 'sequelize';

@Injectable()
export class AccountRepository extends AbstractRepository<Account> {
  constructor(@InjectModel(Account) protected readonly model: typeof Account) {
    super(model);
  }

  public async findOne(
    options: WhereOptions<Account>,
    transaction?: Transaction,
  ) {
    const entity = await this.model.findOne({ where: options, transaction });
    if (!entity) {
      throw new NotFoundException(
        `Entity ${this.model.name} not found by options: ${options}`,
      );
    }
    return entity as Account;
  }
}
