import { AbstractRepository } from '../database/abstract.repository';
import { Account } from '../database/models';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from 'sequelize';

@Injectable()
export class AccountRepository extends AbstractRepository<Account> {
  constructor(@InjectModel(Account) protected readonly model: typeof Account) {
    super(model);
  }

  public async findByPk(id: string, transaction?: Transaction) {
    const entity = await this.model.findByPk(id, { transaction });
    if (!entity) {
      throw new NotFoundException(
        `Entity ${this.model.name} not found by id: ${id}`,
      );
    }
    return entity as Account;
  }
}
