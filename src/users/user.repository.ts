import { AbstractRepository } from '../database/abstract.repository';
import { User } from '../database/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(@InjectModel(User) protected readonly model: typeof User) {
    super(User);
  }
}
