import { AbstractRepository } from '../database/abstract.repository';
import { User } from '../database/models';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(@Inject(User) protected readonly model: typeof User) {
    super(User);
  }
}
