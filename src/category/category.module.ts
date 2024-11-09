import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatabaseModule } from '../database/database.module';
import { Category } from '../database/models';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [DatabaseModule, DatabaseModule.forFeature([Category])],
})
export class CategoryModule {}
