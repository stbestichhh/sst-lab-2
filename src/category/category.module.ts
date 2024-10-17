import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, DatabaseService],
  imports: [DatabaseModule.register(['categories'])],
})
export class CategoryModule {}
