import { AbstractRepository } from '../database/abstract.repository';
import { Category } from '../database/models';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
  constructor(@Inject(Category) protected readonly model: typeof Category) {
    super(model);
  }
}
