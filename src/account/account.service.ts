import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from './dto/createAccount.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async get(id: string) {
    return await this.accountRepository.findByPk(id);
  }

  public async getAll() {
    return await this.accountRepository.findAll();
  }

  public async create(dto: CreateAccountDto) {
    return await this.accountRepository.create(dto);
  }

  public async update(accountId: string, amount: number) {
    const account = await this.accountRepository.findByPk(accountId);
    return await account.set({ money: account.money + amount }).save();
  }

  public async delete(id: string) {
    return await this.accountRepository.delete(id);
  }
}
