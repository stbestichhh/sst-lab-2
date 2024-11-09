import { AbstractRepository } from '../database/abstract.repository';
import { Category } from '../database/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
  constructor(@InjectModel(Category) protected readonly model: typeof Category) {
    super(model);
  }
}
