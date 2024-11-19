import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async get(categoryId: string) {
    return await this.categoryRepository.findByPk(categoryId);
  }

  public async getAll() {
    return await this.categoryRepository.findAll();
  }

  public async create(dto: CreateCategoryDto) {
    return await this.categoryRepository.create(dto);
  }

  public async delete(categoryId: string) {
    return await this.categoryRepository.delete(categoryId);
  }
}
