import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private readonly dbService: DatabaseService) {}

  public get(categoryId: number) {
    const category = this.dbService.get('categories', categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  public getAll() {
    return this.dbService.getAll('categories');
  }

  public create(data: CreateCategoryDto) {
    this.dbService.create('categories', {
      id: data.id,
      data: { name: data.name },
    });
    return { category: data };
  }

  public delete(categoryId: number) {
    return this.dbService.delete('categories', categoryId);
  }
}
