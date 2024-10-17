import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public getAll() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  public getOne(@Param('id') id: number) {
    return this.categoryService.get(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
